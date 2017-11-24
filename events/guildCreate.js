exports.run = async (client, guild) => {
    if(await client.providers.get("mongodb").has("Blacklist_S",guild.id) === true){
        guild.leave();
    }
    client.funcs.serverCheck(client.guild)
};
