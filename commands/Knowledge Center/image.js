const google = require('../../util/google.js');
exports.run = (client, msg, [...q]) => {
    return google.image(q, msg.channel && msg.channel.nsfw).then((link) => {
        let embed = new client.methods.Embed();
        embed.setTitle("Google Image results");
        //embed.setURL(link);
        embed.setColor(global.embedColor);
        embed.setImage(link);
        msg.send({embed:embed});
    });
};

exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['i'],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    cooldown: 3,
};

exports.help = {
    name: 'image',
    description: 'Search google images',
    usage: '<q:string> [...]',
    usageDelim: ' ',
};
