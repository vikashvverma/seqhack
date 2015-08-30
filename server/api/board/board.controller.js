'use strict';
var _ = require('lodash');
var Board = require('./board.model');
var Ride = require('../drive/drive.model');
var User = require('../user/user.model');
// Get list of things
exports.index = function (req, res) {
  Board.find({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, data);
  });
};

exports.create = function (req, res) {
  console.log(req.body);
  var ride = new Board(req.body);
  ride.save(function(err, ride) {
    console.log(err);
    if (err) return handleError(res, err);
    res.json(200,ride);
  });
};

exports.fetchAllRides = function (req, res) {
  Board.findOne({userId:req.params.userId}, function (err, data) {
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
function find(data,from,to){
  var ways=data.waypoints || [];
  ways.unshift({latlang:{G:data.origin.G,K:data.origin.K}});
  ways.push({latalang:{G:data.destination.G,K:data.destination.K}});
  for(var i=0;i<ways.length;i++){
    if(ways[i].latlang.G==from.G && ways[i].latlang.K==from.K){
      break;
    }
  }
  if(i==ways.length) return false;
  for(i++;i<ways.length;i++){
    if(ways[i].latlang.G==to.G && ways[i].latlang.K==to.K){
      break;
    }
  }
  if(i==ways.length) return false;
  ways.pop();
  ways.shift();
  return true;
}
exports.fetchRides = function (req, res) {
  var from=req.body.from;
  var to=req.body.to;
  console.log(req.body);
  if(!from || !to){return res.send(404);}
  Ride.find({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data || !data.length) {
      return res.send(404);
    }
    var out=[];
    for(var o=0;o<data.length;o++){
      if(find(data[o],from,to)){
        out.push({data:data[o]});
        User.findById(data[o].userId, function (err, user) {
          if (err) return res.json([]);
          if (!user) return res.send(401);
          out[0].user=user;
          return res.json(out);
        });
        break;
      }

    }
    console.log(out);

  });
};
exports.update = function (req, res) {
  Board.findOne({id: req.params.id}, function (err, data) {
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
