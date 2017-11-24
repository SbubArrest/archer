exports.run = async(client, msg, [action, element]) => {
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
