const { Listener } = require('discord-akairo');
class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    });
  }

  exec() {
    console.log(`Logged in as ${this.client.user.username}#${this.client.user.discriminator} <${this.client.user.id}>`);
  }
}

module.exports = ReadyListener;