exports.run = async(client, msg, [messageCount]) => {
    let messagecount = messageCount;
    console.log(messagecount)
    if (messagecount > 100) {
        msg.reply("You can only purge up to 100 messages!");
        return;
    }

    msg.channel.messages.fetch({ limit: messagecount })
        .then(messages => {
            const msg_array = messages.filter(m => m.deletable).array();

            if (msg_array.length < messagecount) {
                messagecount = msg_array.length;
            }

            if (msg_array.length == 0) {
                msg.reply("No deletable messages! (Must not be older than 2 weeks)");
                return;
            }
            else {
                msg.channel.bulkDelete(msg_array)
                    .catch(err => {
                        if (err) {
                            msg.reply("Can not delete messages (messages are older than 2 weeks)");
                            return;
                        }
                        else if (!err) {
                            msg.channel.sendMessage(`I have purged ${messagecount} messages! :ok_hand:`);
                        }
                        return;
                    });
            }

            return;
        }).catch(err => {
            msg.reply('Error fetching messages.');
            console.log(err);
        });
}
exports.conf = {
    enabled: true,
    runIn: ['text'],
    aliases: [],
    permLevel: 2,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: [],
    cooldown: 3,
};

exports.help = {
    name: 'purge',
    description: 'Delete a certain ammount of messages between 1 and 100',
    usage: '[messageCount:string]',
    usageDelim: ' ',
};
