'use strict';

var express = require('express');
var controller = require('./board.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.get('/', controller.index);
//router.get('/:id', controller.fetch);
router.post('/', controller.create);
router.use(auth.isAuthenticated());
router.get('/:userId',controller.fetchAllRides);
router.post('/rides',controller.fetchRides);

module.exports = router;
