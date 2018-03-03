const { Command } = require('discord-akairo');
const Discord = require("discord.js");
const ms = require("ms");

class TempBanCommand extends Command {
    constructor() {
        super('tempban', {
          aliases: ['tempban'],
          args: [
            {
              id: 'member',
              type: 'member',
            },
            {
              id: 'time',
              type: 'string'
            },
            {
              id: 'reason',
              type: 'string',
              match: 'rest'
            }
          ],
          clientPermissions: ['BAN_MEMBERS'],
          userPermissions: ['BAN_MEMBERS'],
          category: 'moderation',
          channelRestriction: 'guild'
        });
    }
    async exec(message, args) {
      if (!args.member) {
        return message.reply('User not found.');
      }
      if (!args.time) {
        return message.reply('Please specify a time.')
      }
      if (!args.reason) {
        args.reason = 'No Reason Given';
      }

      let TbanEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag)
      .setDescription("~TEMPBAN~")
      .setColor("#ff0000")
      .addField("User:", args.member)
      .addField("Banned By:", `<@${message.author.id}>`)
      .addField("Reason", args.reason)
      .addField("Time", args.time);

      if (args.member && args.time && args.reason) {
        if (args.member.bannable) {
          await args.member.ban(args.reason);
          await message.channel.send(TbanEmbed);
          setTimeout(function(){
            args.member.guild.unban(args.member.id);
          }, ms(args.time));
        }

        return message.reply(`<@${args.member.id}> can't be banned.`);
      }
    }
}

module.exports = TempBanCommand;
