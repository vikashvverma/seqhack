'use strict';

var express = require('express');
var controller = require('./ride.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.fetch);
//router.post('/', controller.create);

router.use(auth.isAuthenticated());
router.get('/rides/all',controller.getAllStatistics);
router.get('/stat/',controller.getRankStatistics);
router.get('/stat/:id',controller.getStatistics);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
