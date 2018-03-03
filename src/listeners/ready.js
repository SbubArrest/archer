const { Listener } = require('discord-akairo');
const Logger = require('../util/logger');
const checkUser = require('../functions/checkUser');
class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    });
  }

  exec() {
    Logger.info(`Logged in as ${this.client.user.username}#${this.client.user.discriminator} <${this.client.user.id}>`);
    this.client.users.forEach(user => {
      checkUser(user);
    });
  }
}

module.exports = ReadyListener;