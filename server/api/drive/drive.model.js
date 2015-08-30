'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var DriveSchema = new Schema({
  userId:{type:String,required:true},
  cab:[{
    name:String,
    totalSeats:{type:Number},
    vacantSeats:{type:Number}
  }],
  status:{type:String},
  shareWith:{type:String},
  origin:{G:Number,K:Number},
  destination:{G:Number,K:Number},
  waypoints:[{
    latlang:{G:Number,K:Number},
    location:String,
    stopover:{type:Boolean,default:true},
    formatted_address:String
  }],
  requests:[{
    id:String,
    by:String,
    gender:String,
    from:{G:Number,K:Number,formatted_address:String},
    to:{G:Number,K:Number,formatted_address:String},
    allocated:{type:Boolean,default:false}
  }],
  legs:[{
    distance:{text:String,value:Number},
    duration:{text:String,value:Number},
    start_address:String,
    end_address:String,
    start_location:{G:Number,K:Number},
    end_location:{G:Number,K:Number},
    steps:[{
      distance:{text:String,value:Number},
      duration:{text:String,value:Number},
      start_address:String,
      end_address:String,
      start_location:{G:Number,K:Number},
      end_location:{G:Number,K:Number}
    }]
  }],
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('drive', DriveSchema);
