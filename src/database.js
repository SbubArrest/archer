let r = require('rethinkdb');
const { dboptions } = require('../auth.json');
const Logger = require("./util/logger");

let db = r.connect({
  "host": dboptions.host,
  "user": dboptions.user,
  "password": dboptions.password,
  "db":"archer"
});

db.then(function(conn) {
  Logger.info(`Connected to database ${conn.db}`)
}).error(function(error) {
  Logger.error(error);
});


module.exports = {r, db};