/**
 * Created by Jazz on 7/2/2016.
 */
var express = require("express");
var MongoClient = require('mongodb').MongoClient;

var bodyParser = require("body-parser");


var router = express.Router();
module.exports = router;
var uuid = require("node-uuid");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var db = require("../database");

var mongoose = require('mongoose')
var dbm = 'mongodb://localhost:27017/office';
mongoose.connect(dbm);

var User = require('../../models/User.model');
var Profile = require('../../models/Profile.model');


router.get('/newuser' , function (req , res) {
    res.render('newuser');
});

router.post('/newuser' , function (req,res) {
   username = req.body.username;
   passwrd = req.body.password;

        var manager_userdoc = new User({
            uname:username,
            password:passwrd,
            mid : uuid.v4(),
            role : "manager"
        });

        var manager_profiledoc = new Profile({
            name:username,
            euname:username,
            password:passwrd,
            status:"offline"
        });

        manager_userdoc.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully!');
        });
        manager_profiledoc.save(function(err) {
            if (err) throw err;
            console.log('User Profile saved successfully!');
        });
//some comment to test the  
    res.redirect("login");
    
});