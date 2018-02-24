const { Listener } = require('discord-akairo');
const Logger = require('../util/logger');
class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    });
  }

  exec() {
    Logger.info(`Logged in as ${this.client.user.username}#${this.client.user.discriminator} <${this.client.user.id}>`);
  }
}

module.exports = ReadyListener;