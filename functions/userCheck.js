module.exports = (client, user) => {
    client.providers.get("mongodb").has("Users", user.id).then(results => {
        if (results === false) {
            const data = {
                "_id": `${user.id}`,
                "name": `${user.username}`,
                "rank": `0`,
                "credits": "500",
                "ap": "0",
                "bio": "",
                "website": "",
                "avatarurl": `${user.avatarURL("png",512)}`,
                "xp":"0"
            };
            client.providers.get('mongodb').insert('Users', user.id, data);
            logger.info(`Inserted user: ${user.id} into db`);
        }
    });
};
