var express = require('express');
var router = express.Router();
var user = require("../controllers/UserController.js");
router.get('/:id', user.show);
router.get('/', user.show);

module.exports = router;
