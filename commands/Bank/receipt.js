exports.run = async(client, msg, [id]) => {
    if (!id) return msg.reply("No ID! Please try again with an ID!");
    client.providers.get("mongodb").get("Receipts", id).then(data => {
        if (data === null) return msg.reply("Not a valid ID!");
        let embed = new client.methods.Embed();
        embed.setTitle("Receipt " + data._id);
        embed.setColor(global.embedColor);
        embed.addField("Transaction Type", `${data.action}`, true);
        embed.addField("Total Transfered", `${data.transfered}`, true)
        embed.addField("User", `${data.user.name}#${data.user.discrim} (${data.user.id})`, false);
        embed.addField("User Starting Balance", `${data.user.sbalance}`, true)
        embed.addField("User End Balance", `${data.user.ebalance}`, true);
        if (data.receipent.name === "none") {
            embed.addField("Receipent", "None", false);
        }
        else {
            embed.addField("Receipent", `${data.receipent.name}#${data.receipent.discriminator} (${data.receipent.id})`, false)
            embed.addField("Receipent Starting Balance", `${data.receipent.sbalance}`, true)
            embed.addField("Receipent End Balance", `${data.receipent.ebalance}`, true);
        }
        embed.addField("Timestamp", `${data.timestamp}`, false)
        embed.addField("Note", `${data.note}`, false)
        msg.channel.send({ embed: embed });
    });
};
exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 1,
    botPerms: ["SEND_MESSAGES"],
    requiredFuncs: [],
    requiredSettings: [],
    cooldown: 3,
};

exports.help = {
    name: "receipt",
    description: "Get a receipt with a receipt id",
    usage: "[id:string]",
    usageDelim: "",
};
