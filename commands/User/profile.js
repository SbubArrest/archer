exports.run = async(client, msg, [action, element]) => {
  const value = msg.content.split(" ").splice(3).join(" ");
  const user = msg.mentions.users.first() || msg.author;
  if (!action || action.startsWith(`<@`)) {
    client.providers.get("mongodb").get("Users", user.id).then(results => {
      if (!results) return msg.reply("Sorry, that user doesn't exist in my database");
      const embed = new client.methods.Embed();
      embed.setTitle(`${results.name}`)
        .setThumbnail(results.avatarurl)
        .addField("Rank", `${results.rank}`, true)
        .addField("AP", `${results.ap}`, true)
        .addField("Status", `${results.status}`, true)
        .addField("Credits", `${results.credits}`, true)
        .addField("Joined", `${results.joined}`, true)
        .addField("Discriminator", `${results.discrim}`, true)
        .addField("ID", `${results.id}`, true)
      if (results.bio !== "null") {
        embed.addField("Bio", `${results.bio}`, false)
      }
      if (results.website !== "null") {
        embed.addField("Website", `${results.website}`, false)
      }
      msg.channel.sendEmbed(embed);
    })
  }
  else {
    switch (action.toLowerCase()) {
      case 'edit':
        msg.reply('mmmmmmkay')
        break;
      default:
        msg.reply("PLEASE")

    }
  }
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['prof'],
  permLevel: 1,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 5,
};

exports.help = {
  name: 'profile',
  description: 'Shows the profile card of a user',
  usage: '[action:string] [element:string] [value:string]',
  usageDelim: ' '
};
