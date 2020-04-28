const express = require('express');
var router = express.Router();

var ctrlUser = require('../controller/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
module.exports = router;