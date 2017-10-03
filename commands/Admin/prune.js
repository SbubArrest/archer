exports.run = (client, msg, [ammount]) => {
    
};
exports.conf = {
    enabled: true,
    runIn: ['text'],
    aliases: [],
    permLevel: 0,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: [],
    cooldown: 3000,
};

exports.help = {
    name: 'prune',
    description: 'Delete a certain ammount of messages between 1 and 100',
    usage: '<ammount:string>',
    usageDelim: ' ',
};
