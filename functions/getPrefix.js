module.exports = async(client, msg) => {
  if (client.config.prefixMention.test(msg.content)) return client.config.prefixMention;
  let nprefix = await client.providers.get("mongodb").get("Servers", msg.guild.id);
  const prefix = nprefix.prefix;
  const { regExpEsc } = client.funcs;
  if (prefix instanceof Array) {
    for (let i = prefix.length - 1; i >= 0; i--) {
      if (msg.content.startsWith(prefix[i])) return new RegExp(`^${regExpEsc(prefix[i])}`);
    }
  }
  else if (prefix && msg.content.startsWith(prefix)) return new RegExp(`^${regExpEsc(prefix)}`);
  return false;
};
