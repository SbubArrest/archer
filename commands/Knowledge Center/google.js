let google = require("../../util/google.js");
exports.run = (client, msg, [...q]) => {
    return google.search(q, msg.channel && msg.channel.nsfw)
        .then(({ card, results }) => {
            if (card) {
                return msg.reply(card);
            }
            else if (results.length) {
                const links = results.map((r) => r.link);
                msg.send(`${links[0]}`);
                return;
            }
            else {
                return msg.reply('No results found');
            }
        });
};

exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['g'],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    cooldown: 3000,
};

exports.help = {
    name: 'google',
    description: 'Search google for something',
    usage: '<q:string> [...]',
    usageDelim: ' ',
};
