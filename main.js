const Client = require('./src/client');
const client = new Client().build();

const { token } = require('./auth.json');
client.start(token);

module.exports = client;
