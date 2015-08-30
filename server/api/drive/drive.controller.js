'use strict';
var _ = require('lodash');
var Drive = require('./drive.model');
var User = require('../user/user.model');
// Get list of things
exports.index = function (req, res) {
  Drive.find({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, data);
  });
};
exports.bookRide = function (req, res) {
  var id = req.params.id;
  var request = req.body;
  if (!id) return res.send(401);
  Drive.findOne({_id: id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    var exists=data.requests.filter(function (obj) {
      return obj.id==request.id;
    });
    if(exists.length){
      return res.json({status:false,message:"Cab request already exists!"});
    }
    data.requests.push(request);
    data.save(function (err, data) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data);
    });

  });
};

exports.create = function (req, res) {
  console.log(req.body);
  var ride = new Drive(req.body);
  ride.save(function (err, ride) {
    console.log(err);
    if (err) return handleError(res, err);
    res.json(200, ride);
  });
};

exports.getRides = function (req, res) {
  console.log(req.params.userId);
  Drive.find({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var out=data.filter(function(obj){
      console.log(obj.requests,req.params.userId);
      var match=obj.requests.filter(function (request) {
        return request.id==req.params.userId;
      });
      return match.length>0;
    });
console.log(out);
    if(!out.length){
      return res.send(404);
    }
    User.findById(out[0].userId, function (err, user) {
      if (err) return res.json([]);
      if (!user) return res.send(404);
      out=[{data:out[0],user:user}]
      //out[0].user=user;
      return res.json(out);
    });
  });
};

exports.approve = function (req, res) {
  console.log(req.params.userId);
  Drive.findOne({userId: req.params.userId}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    for(var i=0;i<data.requests.length;i++){
      if(data.requests[i].id==req.params.id){
        data.requests[i].allocated=true;
        data.save(function(err,data){
          if(err){return res.send(404);}
          return res.json(data);
        })
        break;
      }
    }

  });
};

exports.fetchAllRides = function (req, res) {
  console.log(req.params.userId);
  Drive.findOne({userId: req.params.userId}, function (err, data) {
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
exports.fetchRides = function (req, res) {
  Drive.findOne({}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    console.log(data);
    return res.json(data);
  });
  update
};
exports.update = function (req, res) {
  Drive.findOne({id: req.params.id}, function (err, data) {
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
