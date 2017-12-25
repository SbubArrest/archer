var tcom = require('thesaurus-com');
exports.run = async(client, msg, [q]) => {
    let query = tcom.search(q);
    if (query.synonyms.length < 1 && query.antonyms.length < 1) {
        let embed = new client.methods.Embed();
        embed.setColor(global.embedColor);
        embed.setTitle("Thesaurus");
        embed.addField("Error", 'No words relevant to: ' + q);
        msg.send({ embed: embed });
    }
    else {
        let embed = new client.methods.Embed();
        embed.setTitle("Thesaurus");
        embed.setColor(global.embedColor);
        if (query.synonyms.length > 0) {
            let synonyms = [];
            query.synonyms.slice(0, 3).map(i => {
                synonyms.push(i);
            });
            embed.addField("Synonyms", `${synonyms.splice(",").join(", ")}`, false);
            synonyms = [];
        }
        if (query.antonyms.length > 0) {
            let antonyms = [];
            query.antonyms.slice(0, 3).map(i => {
                antonyms.push(i);
            });
            embed.addField("Antonyms", `${antonyms.splice(",").join(", ")}`, false);
            antonyms = [];
        }else{
            
        }
        msg.send({embed:embed});
    }
};
exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    requiredSettings: [],
};

exports.help = {
    name: "thesaurus",
    description: "Search the thesaurus for synonyms and antonyms",
    usage: "[q:string]",
    usageDelim: "",
};
