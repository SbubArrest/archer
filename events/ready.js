exports.run = (client) => {
  logger.info(`${client.user.username}[#${client.user.discriminator}] ready for ${client.users.size} users in ${client.guilds.size} servers!`);
  setTimeout(function(){
    client.guilds.forEach(guild =>{
      client.funcs.serverCheck(client,guild);
    });
    client.users.forEach(user =>{
      client.funcs.userCheck(client,user);
    });
  },3000);
};
