const { version: discordVersion } = require("discord.js");
const moment = require("moment");
const config = require("../../config.js").beta[0];
require("moment-duration-format");
const { version: komadaVersion } = require("komada");

exports.run = async (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let embed = new client.methods.Embed();
  embed.setTitle("Statistics");
  embed.setColor(config.embedColor);
  embed.addField("Mem Usage",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true);
  embed.addField("Uptime", `${duration}`, true);
  embed.addField("Users",`${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,true);
  embed.addField("Servers",`${client.guilds.size.toLocaleString()}`,true);
  embed.addField("Channels",`${client.channels.size.toLocaleString()}`,true);
  embed.addField("Discord.js",`v${discordVersion}`,true);
  msg.send({embed:embed});
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 1,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
