'use strict';
var _ = require('lodash');
var Ride = require('./ride.model');
// Get list of things
exports.index = function (req, res) {
  Ride.find({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, data);
  });
};

exports.fetch = function (req, res) {
  Ride.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    console.log(data);
    return res.json(data);
  });
};
exports.update = function (req, res) {
  Ride.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    console.log(JSON.stringify(data, null, 4));
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data);
    });
  });
};
function handleError(res, err) {
  return res.send(500, err);
}
