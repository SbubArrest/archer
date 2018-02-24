const { Command } = require("discord-akairo");
const Logger = require('../../util/logger');
class EvalCommand extends Command {
  constructor(){
    super("eval", {
      aliases: ["eval", 'e'],
      ownerOnly: true,
      clientPermissions: ["EMBED_LINKS"],
      args: [
        {
          id:"code",
          type:"string"
        }
      ]
    })
  }
  exec(message,args) {
    let code = args.code;
    if(code.match('client.token')) return message.reply("Lmao really?");
    if (!code) return message.reply("Where is the code at lmao.");
    if (code.length > 1000) return message.reply("You want me to process all that?");
    let output;
    try {
      output = eval(code);
    }catch(error){
      output = error;
    }
    if(!output) return message.reply("Whut? Where is the output?");
    if (output.length > 1000) output = "Output length is greater than 1000 characters";
    let embed = {
      title:"Eval",
      color:"5675007",
      fields:[
        {
          name:'Input :inbox_tray:',
          value: `\`\`\`js\n${code}\n\`\`\``,
        },
        {
          name:'Output :outbox_tray:',
          value: `\`\`\`\n${output}\n\`\`\``
        },
        {
          name: 'Type (🚹 or 🚺)',
          value: `${typeof code}`
        }
      ]
    };
    return message.channel.send({embed:embed});
  }
}
module.exports = EvalCommand;