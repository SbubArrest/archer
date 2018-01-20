exports.run = async(client, msg) => {
    if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
            .then(connection => {
                msg.reply(`Connected to \`${msg.member.voiceChannel.name}\``);
            })
            .catch(console.log);
    }
    else {
        msg.reply('You need to join a voice channel first!');
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 1,
    botPerms: ["SEND_MESSAGES"],
    requiredFuncs: [],
    requiredSettings: [],
};

exports.help = {
    name: "play",
    description: "Play music from youtube",
    usage: "",
    usageDelim: "",
};
