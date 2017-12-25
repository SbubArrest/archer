const ud = require('urban-dictionary');
exports.run = (client, msg, [...q]) => {
    ud.term(q, function(error, entries, tags, sounds) {
        if (error) {
            let embed = new client.methods.Embed();
            embed.setTitle("Error");
            embed.setColor(16711680);
            embed.setDescription("Term not found or there is a serious error.");
            msg.send({embed:embed});
            return;
        }
        else {
            let embed = new client.methods.Embed();
            embed.setTitle(`${entries[0].word}`)
            .setColor(global.embedColor)
            .setURL(entries[0].permalink)
            .addField('Definition', `${entries[0].definition}`, false);
            if(entries[0].example){
                embed.addField('Example', `${entries[0].example}`,false);
            }else{
                embed.addField('Example', `No example`,false);
            }
            embed.addField("Author", `${entries[0].author}`, false)
            .addField(':thumbsup:',`${entries[0].thumbs_up}`, true)
            .addField(':thumbsdown:',`${entries[0].thumbs_down}`, true);
            msg.sendMessage({embed:embed});
            return;
        }
    });
    return;
};
exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['ud'],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    cooldown: 3000,
};

exports.help = {
    name: 'urban',
    description: 'Search urban dictionary for something',
    usage: '<q:string> [...]',
    usageDelim: ' ',
};
