'use strict';

var express = require('express');
var controller = require('./generateFile.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
router.post('/:EnvironmentId', controller.create);
// router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
// router.delete('/:id', controller.destroy);

module.exports = router;
