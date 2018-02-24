const { AkairoClient } = require('discord-akairo');
let r = require('rethinkdb');
const { dboptions } = require('../auth.json');
const Logger = require('./util/logger');
let db = r.connect({
  "host": dboptions.host,
  "user": dboptions.user,
  "password": dboptions.password,
  "db":"test"
});
db.then(function(conn) {
  Logger.info(`Connected to database ${conn.db}`)
}).error(function(error) {
  Logger.error(error);
});

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
