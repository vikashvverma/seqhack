'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var RideSchema = new Schema({
  userId:{type:String,required:true},
  cab:[{
    totalSeats:{type:Number},
    vacantSeats:{type:Number}
  }],
  status:{type:String},
  shareWith:{type:String},
  origin:{G:Number,K:Number},
  destination:{G:Number,K:Number},
  waypoints:[{
    location:String
  }],
  legs:[{
    distance:{text:String,value:Number},
    duration:{text:String,value:Number},
    start_address:String,
    end_address:String,
    start_location:{G:Number,K:Number},
    end_location:{G:number,k:Number}
  }],
  steps:[{
    distance:{text:String,value:Number},
    duration:{text:String,value:Number},
    start_address:String,
    end_address:String,
    start_location:{G:Number,K:Number},
    end_location:{G:number,k:Number}
  }],
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('ride', RideSchema);
