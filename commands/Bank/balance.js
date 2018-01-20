exports.run = (client, msg) => {
  client.providers.get("mongodb").get("Users", msg.author.id).then(data =>{
    msg.reply(`Your balance is: \`${data.credits}\` credits.`);
    return;
  });
  return;
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
  name: "balance",
  description: "Get your balance",
  usage: "",
  usageDelim: "",
};
