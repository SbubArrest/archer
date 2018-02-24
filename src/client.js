const { AkairoClient, SQLiteProvider } = require('discord-akairo');
//const sqlite = require('sqlite');

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
    /*const db = sqlite.open('../db.sqlite')
      .then(d => d.run('CREATE TABLE IF NOT EXISTS guilds (id TEXT NOT NULL UNIQUE, settings TEXT)').then(() => d));
    this.settings = new SQLiteProvider(db, 'guilds', { dataColumn: 'settings' });*/
  }

  async start(token) {
    //await this.settings.init();
    await this.login(token);
  }
}
module.exports = Client;
