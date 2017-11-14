exports.run = async(client, msg) => {
  client.providers.get("mongodb").get("Users", msg.author.id, "credits").then(results => {
    const nc = parseInt(results.credits) + 250;
    const credits = { "credits": `${nc}` };
    client.providers.get("mongodb").update("Users", msg.author.id, credits);
    msg.reply(`I have added 250 credits to your balance. Your new balance is ${nc}`);
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
  cooldown: 86400,
};

exports.help = {
  name: "daily",
  description: "Add daily credits to your account",
  usage: " ",
  usageDelim: "",
};
