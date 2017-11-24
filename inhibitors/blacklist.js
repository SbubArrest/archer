exports.conf = {
    enabled: false,
    spamProtection: true,
    priority: 11,
};

exports.run = async(client, msg) => {
    if (await client.providers.get("mongodb").has("Blacklist_U", msg.author.id) === false) return false;
    return true;
};
