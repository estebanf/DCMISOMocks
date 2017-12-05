'use strict';

var express = require('express');
var controller = require('./generateIQBatch.controller');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
