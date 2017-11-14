exports.run = (client, msg, [user]) => {
    if (msg.guild.roles.exists("name", "Bot Commander")) {
        var GuildMember = msg.guild.members.get(msg.mentions.users.array()[0].id);
        GuildMember.ban();
        msg.reply("That user has been banned");
    }
    else{
        throw Error('The `Bot Commander` role doesnt exist!')
    }

};
exports.conf = {
    enabled: true,
    runIn: ['text'],
    aliases: [],
    permLevel: 2,
    botPerms: [""],
    requiredFuncs: [],
    cooldown: 3000,
};

exports.help = {
    name: 'ban',
    description: 'Ban a user from the server',
    usage: '<user:string>',
    usageDelim: ' ',
};
