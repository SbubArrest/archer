const { AkairoClient } = require('discord-akairo');
const Logger = require("./util/logger");



class Client extends AkairoClient {
  constructor() {
    super({
      prefix: 'a!',
      ownerID: '145749360515219456',
      commandDirectory: './src/commands/',
      listenerDirectory: './src/listeners/',
      inhibitorDirectory: './src/inhibitors/',
      defaultCooldown: 5000,
      handleEdits: true,
      allowMention: true,
      storeMessages: true,
    });
  }

  async start(token) {
    await this.login(token);
  }
}
module.exports = Client;
