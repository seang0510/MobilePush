var indexController = require('../controller/index');
var express = require('express');
var router = express.Router();
const path = require('path');

router.post('/aotudoora/coadmasterMobilePush', indexController.coadmasterMobilePush);     //자동문의 고수


console.log("server start! router");

module.exports = router;