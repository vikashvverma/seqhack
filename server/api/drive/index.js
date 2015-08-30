'use strict';

var express = require('express');
var controller = require('./drive.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.get('/', controller.index);
//router.get('/:id', controller.fetch);
router.post('/', controller.create);
router.use(auth.isAuthenticated());
router.post('/book/ride/:id',controller.bookRide);
router.get('/get/ride/:userId',controller.getRides);
router.get('/:userId',controller.fetchAllRides);
router.get('/rides/:from/:to',controller.fetchRides);


module.exports = router;
