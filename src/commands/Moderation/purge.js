const { Command } = require('discord-akairo');
const Discord = require("discord.js");

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
           aliases: ['purge'],
           split: 'quoted',
           args: [
             {
               id: 'amount',
               type: 'number'
             }
           ],
           clientPermissions: ['MANAGE_MESSAGES'],
           userPermissions: ['MANAGE_MESSAGES'],
           channelRestriction: 'guild'
        });
    }
    exec(message, args) {
      message.delete()
      if (!args.amount) return message.reply("Please specify an amount.");
      if (args.amount) {
        message.channel.bulkDelete(args.amount);
        message.channel.send(`Purged ${args.amount} messages from ${message.channel}.`).then(msg => msg.delete(5000));
        return;
      }
    }
}

module.exports = PurgeCommand;
