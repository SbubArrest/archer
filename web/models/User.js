var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    joined: String,
    rank: String,
    discrim: String,
    status: String,
    credits: String,
    ap: String,
    bio: String,
    website: String,
    avatarurl: String,
    xp:String
});
module.exports = mongoose.model('User', UserSchema, 'Users');