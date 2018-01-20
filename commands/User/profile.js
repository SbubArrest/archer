const canvas = require('../../classes/canvas')

exports.run = async (client, msg, [user]) => {
  canvas.drawProfile().then(img => {
    
  })
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
  usage: '[user:string]',
  usageDelim: ' '
};
