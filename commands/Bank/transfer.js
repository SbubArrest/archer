exports.run = async(client, msg, [user, ammount, ...note]) => {
  if (!user) return msg.reply("Please mention a user or enter that users ID");
  if (!ammount) return msg.reply("Please enter an ammount");
  if (user.startsWith("<@")) {
    let user1 = msg.mentions.users.first();
    user = user1.id
  }
  if(note.length < 1){
    note = "None"
  }
  if (client.users.get(user) === undefined) return msg.reply("That is not a valid user! The transfer command accepts both mentions and user IDs");
  client.providers.get("mongodb").get("Users", msg.author.id).then(udata => {
    if (ammount > udata.credits) return msg.reply("You don't have the funds to do that! Your current balance is " + `\`${udata.credits}\` credits`);
    let c1 = parseInt(udata.credits);
    let c2 = c1 - parseInt(ammount);
    let data = { credits: c2 };
    client.providers.get("mongodb").update("Users", msg.author.id, data);
    client.providers.get("mongodb").get("Users", `${user}`).then(rdata => {
      let c3 = parseInt(rdata.credits);
      let c4 = c3 + parseInt(ammount);
      let data2 = { credits: c4 };
      client.providers.get("mongodb").update("Users", user, data2);
      let receipent = client.users.get(user);
      client.funcs.genReceipt(client, msg, receipent, 'Transfer', note.toString().split(",").splice(0).join(" "), c1, c2, c3, c4, ammount).then(id => {
        let embed = new client.methods.Embed();
        embed.setTitle("Transfer Credits");
        embed.setColor(global.embedColor);
        embed.addField("User", `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`, false);
        embed.addField("Receipent", `${receipent.username}#${receipent.discriminator} (${receipent.id})`, false);
        embed.addField("Ammount Transfered To Receipent", `${ammount}`, false);
        embed.addField("Receipt ID", `${id}`, false);
        embed.addField("Note", `${note.toString().split(",").splice(0).join(" ")}`, false);
        embed.setTimestamp();
        msg.channel.send({ embed: embed });
        receipent.send({embed:embed});
      });
    })
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
  cooldown: 60,
};

exports.help = {
  name: "transfer",
  description: "Get your balance",
  usage: "[user:string] [ammount:string] [note:string] [...]",
  usageDelim: " ",
};
