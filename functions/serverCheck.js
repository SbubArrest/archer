module.exports = (client, guild) => {
    client.providers.get("mongodb").has("Servers",guild.id).then(results =>{
        if(results === false){
            const data = {
                "_id":`${guild.id}`,
                "name": `${guild.name}`,
                "announcements": "0",
                "prefix": "a!",
                "joinrole": "0",
                "joinmsg": "0",
                "announcechannel": "0",
                "msgchannel": "0",
                "modlogchannel": "0",
                "modlog":[{}]
            };
            client.providers.get('mongodb').insert('Servers', guild.id, data);
            logger.info(`Inserted guild: ${guild.id} into db`);
        }
    });
};
