/**
 * Created by Jazz on 9/11/2016.
 */




var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectname : String ,
    projectdesc : String,
    muname : String,
    projectlead : String
});

module.exports = mongoose.model('Project' ,ProjectSchema );


