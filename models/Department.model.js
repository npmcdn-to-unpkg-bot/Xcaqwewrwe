/**
 * Created by Jazz on 9/11/2016.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    deptname : String ,
    muname : String
});

module.exports = mongoose.model('Department' ,DepartmentSchema );


