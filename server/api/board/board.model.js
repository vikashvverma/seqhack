'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var BoardSchema = new Schema({
  userId:{type:String,required:true},
  cab:[{
    name:String,
    totalSeats:{type:Number},
    vacantSeats:{type:Number}
  }],
  status:{type:String},
  comfortableWith:{type:String},
  origin:{G:Number,K:Number},
  destination:{G:Number,K:Number},
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('board', BoardSchema);
