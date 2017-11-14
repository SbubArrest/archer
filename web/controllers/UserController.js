var mongoose = require("mongoose");
var User = mongoose.model("User");
var userController = {};

userController.show = function(req, res) {
  User.findOne({id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/", {user: user});
    }
  });
};

module.exports = userController;