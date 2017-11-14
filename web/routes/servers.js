var express = require('express');
var router = express.Router();
var server = require("../controllers/ServerController.js");
router.get('/:id', server.show);
router.get('/', server.show);

module.exports = router;
