const { Command } = require('discord-akairo');

class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      channel: 'guild',
      category: 'moderation',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
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
        content: 'Kick a member from your server',
        usage: '[command]',
        examples: ['', 'reason']
      }
    });
  }
  async exec(message, { member, reason }) {
    if (member.bannable) {
      await member.kick();
      if (!reason) reason = "No reason given.";
      return message.reply(`${member} was kicked. Reason: ${reason}`);
    }

    return message.reply(`${member} can't be kicked.`);
  }
}

module.exports = KickCommand;