module.exports = (client, guild) => {
    client.providers.get("mongodb").has("Servers", guild.id).then(results => {
        if (results === false) {
            const data = {
                "_id": `${guild.id}`,
                "name": `${guild.name}`,
                "owner": {
                    "name": `${guild.owner.user.username}`,
                    "discrim": `${guild.owner.user.discriminator}`,
                    "id": `${guild.owner.user.id}`
                },
                "announcements": "0",
                "prefix": "a!",
                "joinrole": "0",
                "joinmsg": "0",
                "announcechannel": "0",
                "msgchannel": "0",
                "modlogchannel": "0",
                "iconurl": `${guild.iconURL({format:"png"})}`,
                "modlog": [{}]
            };
            const data1 = {
                "_id": `${guild.id}`,
                "name": `${guild.name}`,
                "owner": {
                    "name": `${guild.owner.user.username}`,
                    "discrim": `${guild.owner.user.discriminator}`,
                    "id": `${guild.owner.user.id}`
                },
                "announcements": "0",
                "prefix": "a!",
                "joinrole": "0",
                "joinmsg": "0",
                "announcechannel": "0",
                "msgchannel": "0",
                "modlogchannel": "0",
                "iconurl": `null`,
                "modlog": [{}]
            };
            if (guild.iconURL("png",512) === null) {
                client.providers.get('mongodb').insert('Servers', guild.id, data1);
            }
            client.providers.get('mongodb').insert('Servers', guild.id, data);
            logger.info(`Inserted guild: ${guild.id} into db`);
        }
    });
};
