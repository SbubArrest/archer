var express = require('express');
var router = express.Router();
var activity = require("../controllers/ActivityController.js");
router.get('/users', activity.countu);
router.get('/servers', activity.counts);

module.exports = router;
