module.exports = async(client, msg, action, reason, user, victim) => {
    client.providers.get("mongodb").get("Servers", msg.guild.id).then(data => {
        let modlogchannel = data.modlogchannel;
        if (modlogchannel === "0") {
            return;
        }
        try {
            msg.guild.channels.get(modlogchannel);
        }
        catch (err) {
            if (err) {
                return msg.send("Sorry, it appears something is wrong with the channel you chose to be the modlog. This could be because the channel doesn't exist.");
            }
        }
        let channel = msg.guild.channels.get(`${modlogchannel}`);
        client.providers.get("mongodb").get("Servers", msg.guild.id).then(data => {
            let number = data.modlog.length + 1;
            let embed = new client.methods.Embed();
            embed.setTitle(`:hammer: **Case ${number}**: ${action} :hammer:`);
            embed.setColor(global.embedColor)
            embed.addField(':cop: Moderator', `${user.username}#${user.discriminator}`);
            embed.addField(':spy: User', `${victim.username}#${victim.discriminator}`);
            if (!reason) {
                embed.addField(':question: Reason', `No reason given`);
            }
            else {
                embed.addField(':question: Reason', `${reason}`);
            }
            embed.setTimestamp();
            try{
                channel.send({ embed: embed });
            }catch(err){
                return msg.reply("Sorry, but something is wrong with the modlog channel. The channel doesn't exist or isn't configured properly. Use the conf command to set it!");
            }
            const data2 = {
                "id": `${number}`,
                "action": `${action}`,
                "reason": `${reason}`,
                "moderator": `${user.username}#${user.discriminator}`,
                "userid": `${victim.id}`,
                "user": `${victim.username}#${victim.discriminator}`,
            };
            let modlog = data.modlog;
            modlog.push(data2);
            return client.providers.get("mongodb").update("Servers", msg.guild.id, { modlog: modlog });
        });
    });
};
