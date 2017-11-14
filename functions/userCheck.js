module.exports = (client, user) => {
    client.providers.get("mongodb").has("Users", user.id).then(results => {
    var dateFormat = require('dateformat');
    var now = user.createdAt;
        if (results === false) {
            const data1 = {
                "_id": `${user.id}`,
                "name": `${user.username}`,
                "joined": `${dateFormat(now, "mm/dd/yyyy")}`,
                "discrim": `${user.discriminator}`,
                "status": `${user.presence.status}`,
                "rank": `0`,
                "credits": "500",
                "ap": "0",
                "bio": "null",
                "website": "null",
                "avatarurl": `${null}`,
                "xp":"0"
            };
            const data = {
                "_id": `${user.id}`,
                "name": `${user.username}`,
                "joined": `${dateFormat(now, "mm/dd/yyyy")}`,
                "discrim": `${user.discriminator}`,
                "status": `${user.presence.status}`,
                "rank": `0`,
                "credits": "500",
                "ap": "0",
                "bio": "null",
                "website": "null",
                "avatarurl": `${user.avatarURL()}`,
                "xp":"0"
            };
            if(user.avatarURL == null){
                client.providers.get('mongodb').insert('Users', user.id, data1);
            }else{
                client.providers.get('mongodb').insert('Users', user.id, data);
            }
            logger.info(`Inserted user: ${user.id} into db`);
        }
    });
};
