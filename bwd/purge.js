module.exports.func = function (bot, msg){
    var cmd = "^"
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
  
    var messagecount = parseInt(msg.content.replace(cmd + "purge ", ''));
    if (messagecount == 0 || msg.content.replace(cmd + "purge ", '') == null || msg.content.replace(cmd + "purge ", '') == " ") {
      msg.reply("```An error has occured:\nReason: You must insert a number more than 0!```");
      return;
    }
  
    if (messagecount > 100) {
      msg.reply("```An error has occured:\nReason: You can only purge up to 100 messages!```");
      return;
    }
  
    canPrune = false;
  
    setTimeout(function () {
      canPrune = true;
    }, 500);
  
    msg.channel.fetchMessages({ limit: messagecount })
      .then(messages => {
        const msg_array = messages.filter(m => m.deletable).array();
  
        if (msg_array.length < messagecount) {
          messagecount = msg_array.length;
        }
  
        if (msg_array.length == 0) {
          msg.reply("No deletable messages! (Must not be older than 2 weeks)");
          return;
        }
  
        msg.channel.bulkDelete(msg_array)
          .catch(err => {
            msg.reply("\`Can not delete messages (No permissions OR messages are older than 2 weeks)\`");
            return;
          });
  
        msg.channel.sendMessage(`I have purged ${messagecount} messages! :ok_hand:`).then(m => m.delete(5000));
  
      }).catch(err => msg.reply('Error fetching messages.'));
    return;
  }
  
  msg.reply("```You cannot run this command!\nReason: You do not have the MANAGE_MESSAGES permission```");
  }