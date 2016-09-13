/**
 * Created by Jazz on 9/11/2016.
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    name : String,
    role : String ,
    deptname : String,
    muname : String,
    euname : String,
    password : String,
    status : String,
    checked : Boolean,
    pname : Array
});

module.exports = mongoose.model('Profile' ,ProfileSchema );
