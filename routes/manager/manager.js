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



//*************************************     API    ***************************************


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
// var query = {uname:req.user.uname}

router.get('/api/team' , function (req,res) {
    var query = {muname:req.user.username};
    MongoClient.connect(db, function (err, db) {
        if (err) {throw err;}
        db.collection('profiles').find(query).sort({name:1}).toArray(function (err, doc) {
            if (err) {throw err;}
            res.send(doc);
        });
        console.log("Rooms page has been accessed.");
    });
});

router.get('/api/getteamfordept/:deptname' , function (req,res) {
    MongoClient.connect(db, function (err, db) {
        if (err) {throw err;}
        query = {deptname:req.params.deptname , muname:req.user.username};
        db.collection('profiles').find(query).sort({name:1}).toArray(function (err, doc) {
            if (err) {throw err;}
            res.send(doc);
        });
        console.log("Rooms page has been accessed.");
    });
    
});


//*******************************  ADD A TEAM MEMBER    ***********************
router.post("/teamadd", function(req, res){
    //name = req.body.memberName;
    //role = req.body.memberRole;

    MongoClient.connect(db, function(err, db) {
        if(err) throw err;
        var profiledoc = { name:req.body.name,
            role:req.body.role ,
            deptname:req.body.deptname,
            muname:req.user.username,
            euname:req.body.euname,
            password: "12345",
            status:"offline"
        };
        var userdoc = {
            uname:req.body.euname,
            password: "12345",
            manager:false
        };
        db.collection('profiles').insert(profiledoc, function(err, inserted) {
            if(err) throw err;
            console.dir("Successfully inserted: " + JSON.stringify(inserted));
        });
        db.collection('users').insert(userdoc, function(err, inserted) {
            if(err) throw err;
            console.dir("Successfully inserted: " + JSON.stringify(inserted));
            return db.close();
        });

    });
    res.send("team member added");
});

//*******************************  ADD A DEPARTMENT    ***********************


router.post("/departmentadd", function(req, res){
    MongoClient.connect(db, function(err, db) {
        if(err) throw err;
        var doc = { deptname:req.body.name ,
                    muname:req.user.username
                        };

        db.collection('departments').insert(doc, function(err, inserted) {
            if(err) throw err;

            console.dir("Successfully inserted: " + JSON.stringify(inserted));

            return db.close();
        });
    });
    res.send("department added");
});
//*******************************  GET ALL DEPARTMENTS    ***********************


router.get('/api/department' , function (req,res) {
    var query = {muname:req.user.username};
    MongoClient.connect(db, function (err, db) {
        if (err) {throw err;}
        db.collection('departments').find(query).sort({name:1}).toArray(function (err, doc) {
            if (err) {throw err;}
            res.send(doc);
        });
        console.log("Department page has been accessed.");
    });
});

//*******************************  ADD A PROJECT    ***********************
router.post("/projectadd", function(req, res){
    MongoClient.connect(db, function(err, db) {
        if(err) throw err;
        var projectdoc = {
            projectname:req.body.projectname ,
            projectdesc: req.body.projectdescription,
            muname:req.user.username,
            projectlead:req.user.username
        };

        req.body.teamdata.forEach(function (member) {
            db.collection('profiles').update({name:member},{$push:{pname:req.body.projectname}} ,{upsert:true});
        });


        db.collection('projects').insert(projectdoc, function(err, inserted) {
            if(err) throw err;
            console.dir("Successfully inserted: " + JSON.stringify(inserted));
        });


    });
    res.send("department added");
});

//*******************************  GET ALL PROJECTS   ***********************
router.get('/api/projects' , function (req,res) {
    var query = {muname:req.user.username};
    MongoClient.connect(db, function (err, db) {
        if (err) {throw err;}
        db.collection('projects').find(query).sort({name:1}).toArray(function (err, doc) {
            if (err) {throw err;}
            res.send(doc);
        });
        console.log("Department page has been accessed.");
    });

})

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


