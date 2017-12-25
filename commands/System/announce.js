exports.run = async (client, msg, [...m]) => {
	let m2 = m.toString().split(",").join(" ");
	try{
		for (let guild of client.guilds.array())
			await guild.channels.first().send({
				embed: {
					color: '5675007',
					title: '**ANNOUNCEMENT**',
					author: {
						name: msg.author.username,
						icon_url: msg.author.displayAvatarURL({ format: "png" })
					},
					description: `${m2}`,
					timestamp: new Date()	
				}
			});
	} catch (err) {
		console.log(err);
	}
};



exports.conf = {
	enabled: true,
	runIn: ['text', 'dm', 'group'],
	aliases: ['an'],
	permLevel: 9,
	botPerms: ["EMBED_LINKS"],
	requiredFuncs: [],
	cooldown: 3,
};

exports.help = {
	name: 'announce',
	description: 'Announce a message to every server',
	usage: '[m:string] [...]',
	usageDelim: ' ',
};
