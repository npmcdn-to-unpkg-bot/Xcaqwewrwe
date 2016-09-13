/**
 * Created by Jazz on 9/11/2016.
 */



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    uname : String,
    password : String,
    mid: String,
    role: String
});

module.exports = mongoose.model('User' ,UserSchema );
