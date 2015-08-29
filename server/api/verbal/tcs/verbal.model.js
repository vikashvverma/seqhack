'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//var UserSchema=new Schema({
//  userId:{type:String,required:true},
//  marks:Number,
//  errors:Number,
//  warnings:Number
//});
var TestSchema = new Schema({
  id:{type:Number,unique:true,required:true},
  title:String,
  question:{type:String,required:true},
  outline:{type:String,required:true},
  statistics:[{
    userId:{type:String,required:true},
    name:String,
    score:Number,
    error:Number,
    warnings:Number,
    attempted_on:{type:Date,default:new Date()}
  }],
  created_on:{type:Date,default:new Date()}
});

module.exports = mongoose.model('TCSVerbal', TestSchema);
