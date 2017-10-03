exports.run = (client, member) => {
    const data = {
        "_id": `${member.id}`,
        "name": `${member.username}`,
        "rank": `0`,
        "credits": "500",
        "ap": "0",
        "bio": "",
        "website": "",
        "avatarurl": `${member.avatarURL("png",512)}`,
        "xp": "0"
    };
    client.providers.get('mongodb').insert('Users', member.id, data);
    logger.info(`Inserted user: ${member.id} into db`);
};
