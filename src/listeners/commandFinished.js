const { Listener } = require('discord-akairo');
const Logger = require('../util/logger');
class commandFinishedListener extends Listener {
  constructor() {
    super('commandFinished', {
      eventName: 'commandFinished',
      emitter: 'commandHandler'
    });
  }

  exec(message,command) {
    Logger.info(`${command} was ran | ${message.author.username}#${message.author.discriminator} (${message.author.id})`);
  }
}

module.exports = commandFinishedListener;