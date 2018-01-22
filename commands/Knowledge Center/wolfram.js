const ud = require('urban-dictionary');
exports.run = (client, msg, [...q]) => {
    
};
exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['ud'],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    cooldown: 3,
};

exports.help = {
    name: 'wolfram',
    description: 'Search Wolfram for something for something',
    usage: '<q:string> [...]',
    usageDelim: ' ',
};
