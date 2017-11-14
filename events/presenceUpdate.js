exports.run = (client, oldMember, newMember) => {
    client.providers.get("mongodb").get('Users', oldMember.id).then(results => {
        if (!results) return;
        let presence = newMember.presence.status;
        let mpresence = { "status": `${presence}` };
        setTimeout(function() {
            client.providers.get("mongodb").update('Users', { "_id": `${oldMember.id}` }, mpresence);
        }, 2000);
    })
};
