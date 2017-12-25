exports.run = (client, msg, [user, ...reason]) => {
    let r = reason.toString();
    var GuildMember = msg.guild.members.get(msg.mentions.users.array()[0].id);
    let rr = r.split(",").join(" ");
    if(!GuildMember.kickable){msg.reply("Sorry that user isn't kickable"); return;}
    GuildMember.kick({reason:rr});
    msg.reply("That user has been kicked");
    return client.funcs.modLog(client,msg,"Kick",rr,msg.author,GuildMember.user);
    
};
exports.conf = {
    enabled: true,
    runIn: ['text'],
    aliases: [],
    permLevel: 2,
    botPerms: ["KICK_MEMBERS"],
    requiredFuncs: [],
    cooldown: 3,
};

exports.help = {
    name: 'kick',
    description: 'Kick a user from the server',
    usage: '<user:string> [reason:string] [...]',
    usageDelim: ' ',
};
