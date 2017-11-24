exports.run = (client, msg, [user]) => {
    let reason = msg.content.split(" ").splice(2).join(" ");
    var GuildMember = msg.guild.members.get(msg.mentions.users.array()[0].id);
    if(!GuildMember.bannable){msg.reply("Sorry that user isn't bannable"); return;}
    GuildMember.ban({reason:reason});
    msg.reply("That user has been banned");
    client.funcs.modLog(client,msg,"ban",reason,msg.author,GuildMember);
};
exports.conf = {
    enabled: true,
    runIn: ['text'],
    aliases: [],
    permLevel: 2,
    botPerms: ["BAN_MEMBERS"],
    requiredFuncs: [],
    cooldown: 3,
};

exports.help = {
    name: 'ban',
    description: 'Ban a user from the server',
    usage: '<user:string> [reason:string]',
    usageDelim: ' ',
};
