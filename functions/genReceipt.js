var intformat = require('biguint-format'),
    FlakeId = require('flake-idgen');
var timestamp = require('time-stamp');
module.exports = async(client, msg, receipent, action, note, ustart, uend, rstart,rend,total) => {
    function chunk(str, n) {
        var ret = [];
        var i;
        var len;
        for (i = 0, len = str.length; i < len; i += n) {
            ret.push(str.substr(i, n))
        }
        return ret
    }
    var flakeIdGen1 = new FlakeId();
    let id1 = intformat(flakeIdGen1.next(), 'hex')
    let id = chunk(id1.toString(), 4).join(":")
    let data = {
        "_id": id,
        "user": {
            "name": msg.author.username,
            "id": msg.author.id,
            "discrim": msg.author.discriminator,
            "sbalance": ustart,
            "ebalance": uend
        },
        "transfered": total,
        "action": action,
        "receipent": {
            "name": receipent.username || "none",
            "id": receipent.id || "none",
            "discriminator": receipent.discriminator || "none",
            "sbalance": rstart || "none",
            "ebalance": rend || "none"
        },
        'note': note || "none",
        "timestamp": timestamp('YYYY/MM/DD HH:mm:ss:ms UTC')
    };
    client.providers.get("mongodb").insert("Receipts", id, data)
    return id;
};
