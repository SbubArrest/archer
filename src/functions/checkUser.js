const { r,db } = require('../database.js');
const Logger = require('../util/logger');

function checkUser(user){
    db.then(async function(conn) {
      let results = await r.table("users").get(user.id).run(conn);
      if(results === "null" || results === null || results === "undefined"){
        let data = {
          id: user.id,
          username: user.username,
          presence: {
            status: user.presence.status,
            game: user.presence.game
          },
          discrim: user.discriminator,
          avatarURL: user.avatarURL || null
        };
        r.table('users').insert(data).run(conn);
        Logger.info(`Inserted user ${user.id} into the db`);
      }
    }).error(function(error) {
      Logger.error(error);
    });
}
module.exports = checkUser;