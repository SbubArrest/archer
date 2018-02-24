const { Command } = require('discord-akairo');

class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban'],
      channel: 'guild',
      category: 'moderation',
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          id: 'member',
          type: 'member',
        },
        {
          id: 'reason',
          type: 'string'
        }
      ],
      description: {
        content: 'Ban a member from your server',
        usage: '[command]',
        examples: ['', 'reason']
      }
    });
  }
  async exec(message, { member, reason }) {
    if (member.bannable) {
      await member.ban();
      if(!reason) reason = "No reason given.";
      return message.reply(`${member} was banned. Reason: ${reason}`);
    }

    return message.reply(`${member} can't be banned.`);
  }
}

module.exports = BanCommand;