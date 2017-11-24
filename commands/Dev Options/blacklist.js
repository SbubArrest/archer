exports.run = async(client, msg, [type]) => {
    let id = msg.content.split(" ").splice(2).join(" ")
    switch (type.toLowerCase()) {
        default: msg.reply("Please choose a category to blacklist. The categories you can choose from are: User and Server")
        case 'user':
            if (!id) return msg.reply("Please enter a user ID to blacklist");
            let user = client.users.get(`${id}`)
            if (!user) {
                if (await client.providers.get("mongodb").has("Blacklist_U", id) === true) {
                    msg.reply("User has already been blacklisted");
                    return
                }
                const data = {
                    "_id": `${id}`,
                };
                client.providers.get("mongodb").create("Blacklist_U", id, data);
                msg.reply(`Successfully blacklisted user ${id}`) 
            }
            else {
                if (await client.providers.get("mongodb").has("Blacklist_U", user.id) === true) {
                    msg.reply("User has already been blacklisted");
                    return
                }
                const data = {
                    "_id": `${user.id}`,
                    "username": `${user.username}`
                };
                client.providers.get("mongodb").create("Blacklist_U", user.id, data);
                msg.reply(`Successfully blacklisted user ${user.username}#${user.discriminator} `)
            }
            break;
        case 'server':
            if (!id) return msg.reply("Please enter a server ID to blacklist");
            let server = client.guilds.get(`${id}`)
            if (!server) {
                if (await client.providers.get("mongodb").has("Blacklist_S", id) === true) {
                    msg.reply("Server has already been blacklisted");
                    return
                }
                const data = {
                    "_id": `${id}`,
                };
                client.providers.get("mongodb").create("Blacklist_S", id, data);
                msg.reply(`Successfully blacklisted server ${id}`);
            }
            else {
                server.leave();
                if (await client.providers.get("mongodb").has("Blacklist_S", server.id) === true) {
                    msg.reply("Server has already been blacklisted");
                    return
                }
                const data = {
                    "_id": `${server.id}`,
                    "name": `${server.name}`
                };
                client.providers.get("mongodb").create("Blacklist_S", server.id, data);
                msg.reply(`Successfully blacklisted server ${server.name}(${server.id})`)
            }
    }
};



exports.conf = {
    enabled: true,
    runIn: ['text', 'dm', 'group'],
    aliases: ['bl'],
    permLevel: 9,
    botPerms: [],
    requiredFuncs: [],
    cooldown: 0,
};

exports.help = {
    name: 'blacklist',
    description: 'Blacklist a user/server from accessing the bot',
    usage: '[type:string] [id:string]',
    usageDelim: ' ',
};
