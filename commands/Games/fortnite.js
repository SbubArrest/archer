var request = require("request");
exports.run = async(client, msg, [platform, ...user1]) => {
    let user = user1.toString().split(",").join(" ");
    if (!platform) return msg.reply('Please choose one of the platforms: PC, XBL, PSN!');
    switch (platform.toLowerCase()) {
        case 'pc':
            if (!user) return msg.reply("Please enter a username to search!")
            var options = {
                url: `${encodeURI('https://api.fortnitetracker.com/v1/profile/pc/'+user)}`,
                headers: {
                    'TRN-Api-Key': '4872baad-8acf-4bc3-8bdd-f4c8027665c7'
                }
            };
            request.get(options, function(err, result, body) {
                if (err) {
                    logger.error(err);
                    msg.reply("Sorry there was an error");
                    return;
                }
                let info = JSON.parse(body);
                if (info.error && info.error === "Player Not Found") {
                    msg.reply("Player not found.")
                    return;
                }
                if (info.error) {
                    msg.reply("Sorry there was an error, please try again later. If this problem persist, please contact the devs");
                    return;
                }
                let embed = new client.methods.Embed();
                embed.setTitle(`Fortnite Stats: ${info.epicUserHandle}`)
                embed.setColor(global.embedColor)
                embed.setThumbnail('http://assets1.ignimgs.com/2017/09/12/fortnite-1280-1505174977571_400w.jpg');
                embed.addField("Platform", 'PC', true)
                embed.addField("Username", `${info.epicUserHandle}`, true)
                embed.addField("K/D", `${info.lifeTimeStats[11].value}`, true)
                embed.addField("Kills", `${info.lifeTimeStats[10].value}`, true)
                embed.addField("Wins", `${info.lifeTimeStats[8].value}`, true)
                embed.addField("Win percentage", `${info.lifeTimeStats[9].value}%`, true)
                embed.addField('Avg survival time', `${info.lifeTimeStats[14].value}`, true)
                embed.addField("Matches played", `${info.lifeTimeStats[7].value}`, true)
                embed.addField("Score", `${info.lifeTimeStats[6].value}`, true)
                embed.addField("Top 25", `${info.lifeTimeStats[5].value}`, true)
                embed.addField("Top 12", `${info.lifeTimeStats[4].value}`, true)
                embed.addField("Top 6", `${info.lifeTimeStats[3].value}`, true)
                embed.addField("Top 5", `${info.lifeTimeStats[1].value}`, true)
                embed.addField("Top 3", `${info.lifeTimeStats[2].value}`, true)
                msg.send({ embed: embed });
                return;
            });
            break;
        case 'psn':
            if (!user) return msg.reply("Please enter a username to search!")
            var poptions = {
                url: `${encodeURI('https://api.fortnitetracker.com/v1/profile/psn/'+user)}`,
                headers: {
                    'TRN-Api-Key': '4872baad-8acf-4bc3-8bdd-f4c8027665c7'
                }
            };
            request.get(poptions, function(err, result, body) {
                if (err) {
                    logger.error(err);
                    msg.reply("Sorry there was an error");
                    return;
                }
                let info = JSON.parse(body);
                if (info.error && info.error === "Player Not Found") {
                    msg.reply("Player not found.")
                    return;
                }
                if (info.error) {
                    msg.reply("Sorry there was an error, please try again later. If this problem persist, please contact the devs");
                    return;
                }
                let embed = new client.methods.Embed();
                embed.setTitle(`Fortnite Stats: ${info.epicUserHandle}`)
                embed.setColor(global.embedColor)
                embed.setThumbnail('http://assets1.ignimgs.com/2017/09/12/fortnite-1280-1505174977571_400w.jpg');
                embed.addField("Platform", 'PlayStation', true)
                embed.addField("Username", `${info.epicUserHandle}`, true)
                embed.addField("K/D", `${info.lifeTimeStats[11].value}`, true)
                embed.addField("Kills", `${info.lifeTimeStats[10].value}`, true)
                embed.addField("Wins", `${info.lifeTimeStats[8].value}`, true)
                embed.addField("Win percentage", `${info.lifeTimeStats[9].value}%`, true)
                embed.addField('Avg survival time', `${info.lifeTimeStats[14].value}`, true)
                embed.addField("Matches played", `${info.lifeTimeStats[7].value}`, true)
                embed.addField("Score", `${info.lifeTimeStats[6].value}`, true)
                embed.addField("Top 25", `${info.lifeTimeStats[5].value}`, true)
                embed.addField("Top 12", `${info.lifeTimeStats[4].value}`, true)
                embed.addField("Top 6", `${info.lifeTimeStats[3].value}`, true)
                embed.addField("Top 5", `${info.lifeTimeStats[1].value}`, true)
                embed.addField("Top 3", `${info.lifeTimeStats[2].value}`, true)
                msg.send({ embed: embed });
                return;
            });
            break;
        case 'xbl':
            if (!user) return msg.reply("Please enter a username to search!")
            var xoptions = {
                url: `${encodeURI('https://api.fortnitetracker.com/v1/profile/xbl/'+user)}`,
                headers: {
                    'TRN-Api-Key': '4872baad-8acf-4bc3-8bdd-f4c8027665c7'
                }
            };
            console.log(xoptions.url)
            request.get(xoptions, function(err, result, body) {
                if (err) {
                    logger.error(err);
                    msg.reply("Sorry there was an error");
                    return;
                }
                let info = JSON.parse(body);
                if (info.error && info.error === "Player Not Found") {
                    msg.reply("Player not found.")
                    return;
                }
                if (info.error) {
                    msg.reply("Sorry there was an error, please try again later. If this problem persist, please contact the devs");
                    return;
                }
                let embed = new client.methods.Embed();
                embed.setTitle(`Fortnite Stats: ${info.epicUserHandle}`)
                embed.setColor(global.embedColor)
                embed.setThumbnail('http://assets1.ignimgs.com/2017/09/12/fortnite-1280-1505174977571_400w.jpg');
                embed.addField("Platform", 'XBox', true)
                embed.addField("Username", `${info.epicUserHandle}`, true)
                embed.addField("K/D", `${info.lifeTimeStats[11].value}`, true)
                embed.addField("Kills", `${info.lifeTimeStats[10].value}`, true)
                embed.addField("Wins", `${info.lifeTimeStats[8].value}`, true)
                embed.addField("Win percentage", `${info.lifeTimeStats[9].value}%`, true)
                embed.addField('Avg survival time', `${info.lifeTimeStats[14].value}`, true)
                embed.addField("Matches played", `${info.lifeTimeStats[7].value}`, true)
                embed.addField("Score", `${info.lifeTimeStats[6].value}`, true)
                embed.addField("Top 25", `${info.lifeTimeStats[5].value}`, true)
                embed.addField("Top 12", `${info.lifeTimeStats[4].value}`, true)
                embed.addField("Top 6", `${info.lifeTimeStats[3].value}`, true)
                embed.addField("Top 5", `${info.lifeTimeStats[1].value}`, true)
                embed.addField("Top 3", `${info.lifeTimeStats[2].value}`, true)
                msg.send({ embed: embed });
                return;
            });
            break;
        default:
            msg.reply('Please choose one of the platforms: PC, XBL, PSN!')
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 1,
    botPerms: ["SEND_MESSAGES"],
    requiredFuncs: [],
    requiredSettings: [],
};

exports.help = {
    name: "fortnite",
    description: "Get Fortnite stats for users on PC/XBL/PSN",
    usage: "[platform:string] [user:string] [...]",
    usageDelim: " ",
};
