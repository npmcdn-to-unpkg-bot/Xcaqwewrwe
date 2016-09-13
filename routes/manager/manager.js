/**
 * Created by Jazz on 7/12/2016.
 */
var express = require("express");
var MongoClient = require('mongodb').MongoClient;

var bodyParser = require("body-parser");


var router = express.Router();
module.exports = router;

var db = require("../database");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//******************************    Mongoose Connection    *********************************


var User = require('../../models/User.model');
var Profile = require('../../models/Profile.model');
var Department = require('../../models/Department.model');
var Project = require('../../models/Project.model');

//************************************************************************************


//*****************************Use this for router level authentication****************************************

/*router.use(function (request,response, next) {
    if(request.user.manager===true){
        next();
        return;
    }
    response.redirect("/login");
});
*/
//*************************************     GET USER    ***************************************
router.get("/getuser", function(req, res){
    var doc  = req.session.passport.user;
    res.send(doc);

});

//*******************************  GET ALL TEAM MEMBER    ***********************

router.get('/api/team' , function (req,res) {
    var query = {muname:req.user.username};
    Profile.find(query).sort({name:1}).exec(function(err,doc) {
        if (err) {throw err;}
        res.send(doc);
    });
});

router.get('/api/getteamfordept/:deptname' , function (req,res) {
    var query = {deptname:req.params.deptname , muname:req.user.username};
    Profile.find(query).sort({name:1}).exec(function(err,doc) {
        if (err) {throw err;}
        res.send(doc);
    });
});

//*******************************  ADD A TEAM MEMBER    ***********************
router.post("/teamadd", function(req, res){

    var userdoc = new User({
        uname:req.body.euname,
        password: "12345",
        manager:false
    });

    var profiledoc = new Profile({
        name:req.body.name,
        role:req.body.role ,
        deptname:req.body.deptname,
        muname:req.user.username,
        euname:req.body.euname,
        password: "12345",
        status:"offline",
        checked : false
    });

    userdoc.save(function(err) {
        if (err) throw err;
        console.log('Team Member saved successfully!');
    });

    profiledoc.save(function(err) {
        if (err) throw err;
        console.log('Team Member Profile saved successfully!');
    });

    res.send("team member added");
});

//*******************************  ADD A DEPARTMENT    ***********************


router.post("/departmentadd", function(req, res){

    var Department_doc = new Department({
        deptname:req.body.name ,
        muname:req.user.username
    });

    Department_doc.save(function(err) {
        if (err) throw err;
        console.log('Department saved successfully!');
    });
    res.send("department added");
});
//*******************************  GET ALL DEPARTMENTS    ***********************


router.get('/api/department' , function (req,res) {
    var query = {muname:req.user.username};
    Department.find(query).sort({name:1}).exec(function(err,doc) {
        if (err) {throw err;}
        res.send(doc);
    });
});

//*******************************  ADD A PROJECT    ***********************
router.post("/projectadd", function(req, res){

        var projectdoc = new Project({
            projectname:req.body.projectname ,
            projectdesc: req.body.projectdescription,
            muname:req.user.username,
            projectlead:req.user.username
        });

        projectdoc.save(function(err) {
            if (err) throw err;
            console.log('Project saved successfully!');
        });

        req.body.teamdata.forEach(function (member) {
            var query = {name:member};
            var doc = {$push:{pname:req.body.projectname}};
            var options  = {upsert:true};

            Profile.findOneAndUpdate(query, doc , options, function(err, updated){
                if(err) throw err;
                console.log(updated);
            });

        });
/*
    req.body.teamdata.forEach(function (member) {
        db.collection('profiles').update({name:member},{$push:{pname:req.body.projectname}} ,{upsert:true});
    });
    res.send("department added");
    */
});

//*******************************  GET ALL PROJECTS   ***********************
router.get('/api/projects' , function (req,res) {
    var query = {muname:req.user.username};
    Project.find(query).sort({name:1}).exec(function(err,doc) {
        if (err) {throw err;}
        res.send(doc);
    });
});

router.get('/api/getteamforproject/:projectname' , function (req,res) {
    MongoClient.connect(db, function (err, db) {
        if (err) {throw err;}
        query = {pname:req.params.projectname , muname:req.user.username};
        db.collection('profiles').find(query).sort({name:1}).toArray(function (err, doc) {
            if (err) {throw err;}
            res.send(doc);
        });
        console.log("Rooms page has been accessed.");
    });

});



///************************************    ROUTES **************************


