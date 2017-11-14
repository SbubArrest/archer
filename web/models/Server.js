var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    owner: Object,
    iconurl: String,
});
module.exports = mongoose.model('Server', UserSchema, 'Servers');