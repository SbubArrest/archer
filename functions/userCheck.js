module.exports = (client, user) => {
    client.providers.get("mongodb").has("Users", user.id).then(results => {
    var dateFormat = require('dateformat');
    var now = user.createdAt;
        if (results === false) {
            const data = {
                "_id": `${user.id}`,
                "name": `${user.username}`,
                "joined": `${dateFormat(now, "mm/dd/yyyy")}`,
                "discrim": `${user.discriminator}`,
                "status": `${user.presence.status}`,
                "rank": '0',
                "credits": "500",
                "ap": "0",
                "bio": "null",
                "website": "null",
                "avatarurl": user.avatarURL ? user.avatarURL() : 'null',
                "xp":"0"
            };
            client.providers.get('mongodb').insert('Users', user.id, data);
            logger.info(`Inserted user: ${user.id} into db`);
        }
    });
};
