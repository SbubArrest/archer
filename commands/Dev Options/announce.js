exports.run = (client, config, msg, [message]) => {
    client.guilds.forEach(guild => {
        guild.channels.first().send({embed:{color:config.embedColor, title:'**ANNOUNCEMENT**',author:{name:msg.author.username, icon_url:msg.author.displayAvatarURL({ format: "png" })},description:`${message}`,timestamp:new Date()}});
    });
};



exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['an'],
    permLevel: 0,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    cooldown: 3000,
};

exports.help = {
    name: 'announce',
    description: 'Announce a message to every server',
    usage: '<message:string>',
    usageDelim: ' ',
};
