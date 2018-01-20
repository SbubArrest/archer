module.exports = async(client, msg) => {
  if (client.config.prefixMention.test(msg.content)) return client.config.prefixMention;
  if (!msg.guild) {
    let prefix = client.config.prefix;
    const { regExpEsc } = client.funcs;
    if (prefix instanceof Array) {
      for (let i = prefix.length - 1; i >= 0; i--) {
        if (msg.content.startsWith(prefix[i])) return new RegExp(`^${regExpEsc(prefix[i])}`);
      }
    }
    else if (prefix && msg.content.startsWith(prefix)) return new RegExp(`^${regExpEsc(prefix)}`);
    return false;
  }
  let nprefix = await client.providers.get("mongodb").get("Servers", msg.guild.id);
  let prefix = nprefix.prefix
  const { regExpEsc } = client.funcs;
  if (prefix instanceof Array) {
    for (let i = prefix.length - 1; i >= 0; i--) {
      if (msg.content.startsWith(prefix[i])) return new RegExp(`^${regExpEsc(prefix[i])}`);
    }
  }
  else if (prefix && msg.content.startsWith(prefix)) return new RegExp(`^${regExpEsc(prefix)}`);
  return false;
};
