module.exports = async(client, msg, action, reason, user, victim) => {
    client.providers.get("mongodb").getAll("Servers").then(data => {
        let modlogchannel = data.modlogchannel;
        console.log(modlogchannel)
        let channel = msg.guild.channels.get(`${modlogchannel}`);
        console.log(channel);
        let number = data.length + 1;
        let embed = new client.methods.Embed();
        embed.setTitle(`Case #${number}`);
        channel.send({ embed: embed });
        let msgid = msg.guild.channels.get(modlogchannel).lastMessageID;
        let guild = msg.guild.id;
        const data2 = {
            "id": `${guild.id}`,
            "number": `${number}`,
            "action": `${action}`,
            "reason": `${reason}`,
            "moderator": `${user.username}#${user.discriminator}`,
            "userid": `${victim.id}`,
            "user": `${victim.username}#${victim.discriminator}`,
            "msgid": `${msgid}`
        };
        client.providers.get("mongodb").insert("Modlog", msg.guild.id, data2);
    });
};
