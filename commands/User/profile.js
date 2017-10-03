const snekfetch = require("snekfetch");
const fs = require("fs-nextra");
const { resolve, join } = require('path');
exports.run = async(client, msg, [user]) => {
  var Canvas = require('canvas'),
    Image = Canvas.Image,
    canvas = new Canvas(200, 200),
    ctx = canvas.getContext('2d');

  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Awesome!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();
  canvas.toBuffer(function(err, buf){
    msg.send('', { file: { attachment:buf } });
  });
}

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['prof'],
  permLevel: 1,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 5000,
};

exports.help = {
  name: 'profile',
  description: 'Shows the profile card of a user',
  usage: '[user:user]',
  usageDelim: ' '
};
