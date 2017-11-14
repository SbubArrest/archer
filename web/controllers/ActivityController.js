var mongoose = require("mongoose");
var Server = mongoose.model("Server");
var User = mongoose.model("User");
var activityController = {};

activityController.countu = function(req, res) {
 User.count({}, function( err, count){
    if(err){
        console.log(err);
    }
    res.render('../views/activity/', {ruc:count})
});
};
activityController.counts = function(req, res) {
 Server.count({}, function( err, count){
    if(err){
        console.log(err);
    }
    res.render('../views/activity/', {rsc:count})
});
};

module.exports = activityController;