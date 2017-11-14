var mongoose = require("mongoose");
var Server = mongoose.model("Server");
var serverController = {};

serverController.show = function(req, res) {
  Server.findOne({id: req.params.id}).exec(function (err, server) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/servers/", {server: server});
    }
  });
};

module.exports = serverController;