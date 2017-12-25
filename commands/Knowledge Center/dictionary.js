var request = require("request");
exports.run = async(client, msg, [q]) => {
    request('https://owlbot.info/api/v2/dictionary/' + q + '?format=json', function(err, res, body) {
        if (err) {
            logger.error(err);
            return;
        }
        let e
        try {
            if (typeof body === 'string')
                body = JSON.parse(body)
        } catch (err) {
            e = 1
        }
        let embed
        if (!body.length || e) {
            embed = new client.methods.Embed();
            embed.setTitle("Dictionary");
            embed.setColor(global.embedColor);
            embed.setDescription("Term not found. Did you spell it right?");
        } else {
            embed = new client.methods.Embed();
            embed.setTitle("Dictionary");
            embed.setColor(global.embedColor);
            embed.addField("Part of Speech", `${body[0].type}`, false);
            embed.addField("Definition", `${body[0].definition}`, false);
            if (body[0].example) {
                embed.addField("Example", `${body[0].example}`);
            }
        }
        msg.send({ embed: embed });
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: ['define'],
    permLevel: 1,
    botPerms: ["EMBED_LINKS"],
    requiredFuncs: [],
    requiredSettings: [],
};

exports.help = {
    name: "dictionary",
    description: "Search the dictionary for a term",
    usage: "[q:string]",
    usageDelim: "",
};
