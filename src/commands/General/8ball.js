const { Command } = require("discord-akairo");

class BallCommand extends Command {
  constructor(){
    super("8ball", {
      aliases: ["8", "8ball", "ball"],
      category: 'general',
      description:{
        content: "Ask and receive",
        usage:"",
        examples: [""]
      },
      args: [
        {
          id:"question",
          type: "string",
          match: "content",
          prompt:{
            start:"Whats your question?"
          }
        }
      ]
    })
  }
  exec(message,args){
    const replies = ["Maybe", "Ask again", "No", "Possibly","In the distant future", "Don't count on it", "Absolutely not"]
    const reply = replies[Math.floor(Math.random()*replies.length)];
    return message.reply(reply);
  }
}

module.exports = BallCommand;