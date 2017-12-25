const request = require("request");
const { JSDOM } = require('jsdom')
const jQuery = require('jquery');

exports.run = async(client, msg, [action, q]) => {
	switch (action.toLowerCase()) {
		case 'user':
			request('http://api.roblox.com/users/get-by-username?username=' + q, function(err, response, body) {
				if (err){
					return logger.error(err);
				}
				body = JSON.parse(body)
				if (body.success === false){
					let embed = new client.methods.Embed();
					embed.setTitle("ROBLOX API Error")
					embed.setColor(global.embedColor)
					embed.setDescription(body.errorMessage);
					return msg.send({embed:embed});
				}
				if (typeof body === 'string'){
					body = JSON.parse(body)
				}
				let user = {
					username: body.Username,
					online: body.IsOnline,
					id: body.Id
				}
				request(`https://www.roblox.com/users/${user.id}/profile`, function (err, res, body) {
					if (err)
						return logger.error(err);
					let { window } = new JSDOM(body);
					let { document } = window;
					let $ = jQuery(window);
					user.about = $('.profile-about-content-text').text()
					user.friends = +$('[data-friendscount]').attr('data-friendscount')
					user.followers = +$('[data-followerscount]').attr('data-followerscount')
					user.following = +$('[data-followingscount]').attr('data-followingscount')
					// Final: Boolean, Url: String, RetryUrl: ?String, UserId: Number, EndpointType: String<Type>
					user.avatar = JSON.parse($('.profile-avatar-image img').attr('thumbnail'))
					let embed = new client.methods.Embed();
					// embed.setTitle(`${user.username}`);
					embed.setThumbnail(user.avatar.Url);
					if (user.about)
						embed.setDescription(user.about)

					embed.setColor(global.embedColor);
					// embed.addField("Online", `${user.online}`, true);
					// embed.setColor(user.online ? '#43b581' : '#747f8d')
					embed.setTitle(`${user.username} (${user.online ? 'Online' : 'Offline'})`)

					embed.addField("Friends", `${user.friends}`, true)
					embed.addField("Followers", `${user.followers}`, true)
					embed.addField('Following', `${user.following}`, true)
					embed.setTimestamp()
					msg.send({ embed: embed });
				});
			});
			break;
		case 'group':
			msg.reply("Coming soon!");
	}
};
exports.conf = {
	enabled: true,
	runIn: ["text", "dm", "group"],
	aliases: [],
	permLevel: 1,
	botPerms: ["EMBED_LINKS"],
	requiredFuncs: [],
	requiredSettings: [],
};

exports.help = {
	name: "roblox",
	description: "Search roblox users",
	usage: "<user|group> <q:string>",
	usageDelim: " ",
}
