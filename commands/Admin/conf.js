const { inspect } = require("util");

const handle = (value) => {
  if (typeof value !== "object") return value;
  if (value === null) return "Not set";
  if (value instanceof Array) return value[0] ? `[ ${value.join(" | ")} ]` : "None";
  return value;
};

exports.run = async(client, msg, [action, key, ...value]) => {
  const configs = await client.providers.get("mongodb").get("Servers", msg.guild.id);
  switch (action) {
    case "set":
      {
        if (!key) return msg.sendMessage("You must provide a key");
        if (!value[0]) return msg.sendMessage("You must provide a value");
        if (key === "_id" || key === "modlog" || key === "owner" || key === "name" || key === "iconurl") return msg.send("Sorry, you can't edit that!");
        if(key === "prefix"){
          console.log(value.toString().length)
          if(value.toString().length > 4){
            msg.reply("Sorry, the prefix length can't exceed 4");
            return;
          };
        }
        const response = await client.providers.get("mongodb").update("Servers", msg.guild.id, {
          [key]: value.join(" ") });
        return msg.sendMessage(`Successfully updated the key **${key}**: \`${value.join(" ")}\``);
      }
    case "get":
      {
        if (!key) return msg.sendMessage("You must provide a key");
        if (!(key in configs)) return msg.sendMessage(`The key **${key}** does not seem to exist.`);
        return msg.sendMessage(`The value for the key **${key}** is: \`${inspect(configs[key])}\``);
      }
    case "reset":
      {
        if (!key) return msg.sendMessage("You must provide a key");
        if (key === "_id" || key === "modlog" || key === "owner" || key === "name" || key === "iconurl") return msg.send("Sorry, you can't reset that!");
        if (key === "prefix") {
          client.providers.get("mongodb").update("Servers", msg.guild.id, {
            [key]: 'a!' });
          return msg.sendMessage(`The key **${key}** has been reset to: \`a!\``);
        }
        const response = await client.providers.get("mongodb").update("Servers", msg.guild.id, {
          [key]: 0 });
        return msg.sendMessage(`The key **${key}** has been reset to: \`${response}\``);
      }
    case "list":
      {
        const longest = Object.keys(configs).sort((a, b) => a.length < b.length)[0].length;
        const output = ["= Guild Settings ="];
        for (let [k, v] of Object.entries(configs)) {
          if (k === "id") continue;
          if (!['_id', 'name', 'owner', 'iconurl', 'modlog', 'announcements','msgchannel','joinmsg','joinrole','announcechannel'].includes(k))
            output.push(`${k.padEnd(longest)} :: ${handle(v)}`);
        }
        return msg.sendCode("asciidoc", output);
      }
      // no default
  }

  return null;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 2,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "<set|reset|get|list> [key:string] [value:string] [...]",
  usageDelim: " ",
  extendedHelp: [
    'Announcements can only be set to 1 or 0. 0 means announcements are off while 1 means they are on.',
  ].join('\n'),
};
