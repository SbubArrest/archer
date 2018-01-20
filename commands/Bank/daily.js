exports.run = async(client, msg) => {
  client.funcs.userCheck(client, msg.author);
  client.providers.get("mongodb").get("Users", msg.author.id).then(results => {
    let credits = parseInt(results.credits);
    let data = { credits: credits + parseInt(250) };
    client.providers.get("mongodb").update("Users", msg.author.id, data).then(nr => {
      client.providers.get("mongodb").get("Users", msg.author.id).then(results2 => {
        let embed = new client.methods.Embed();
        client.funcs.genReceipt(client, msg, 'none', 'Daily', 'none', results.credits, data.credits, 'none', 'none', '250').then(id => {
          embed.setTitle("Daily Credits");
          embed.setColor(global.embedColor);
          embed.addField("Balance", `${results2.credits}`,false);
          embed.addField("Receipt ID", `${id}`,false);
          embed.setTimestamp();
          msg.channel.send({ embed: embed })
        });
      });
    });
  })
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 1,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
  cooldown: 86400,
};

exports.help = {
  name: "daily",
  description: "Add credits to your balance",
  usage: "",
  usageDelim: "",
};
