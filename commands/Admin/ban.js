exports.run = (client, msg, [user, ...reason]) => {
    let r = reason.toString();
    var GuildMember = msg.guild.members.get(msg.mentions.users.array()[0].id);
    let rr = r.split(",").join(" ");
    if(!GuildMember.bannable){msg.reply("Sorry that user isn't bannable"); return;}
    GuildMember.ban({reason:rr});
    msg.reply("That user has been banned");
    return client.funcs.modLog(client,msg,"Ban",rr,msg.author,GuildMember.user);
    
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
    usage: '<user:string> [reason:string] [...]',
    usageDelim: ' ',
};
