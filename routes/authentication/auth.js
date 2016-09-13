var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var db = require("../database");
var passport = require("passport");

var router = express.Router();
module.exports = router;



var http = require('http').Server(router);
var io = require('socket.io')(http);


router.get("/login", function (request, response) {
   /* if(request.app.get('env') === 'development'){
        var usern ={};
        usern.uname = 'ex';
        usern.password = '123';
        var user = usern;
        request.logIn(user, function (err) {
            if(err){return next(err)}
            return response.redirect('/home')
        });
        return;
    }
    */
    response.render("login");
});





router.post("/login", passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

router.get("/logout", function (request,response) {


    io.on('connection', function(socket){
        socket.broadcast.emit('logoff' , "sfdf");
    });

    //***************************   OFFLINE TRACKER START ******************************   
        var query = { euname :request.user.username  };
        MongoClient.connect(db, function(err, db) {
            if(err) throw err;

            doc = {$set:{status:"offline" }};
            db.collection('profiles').update(query, doc, function(err, updated) {
                if(err) throw err;
                console.log( query.euname+ " went Offline");
                return db.close();
            });


            //***************************   OFFLINE TRACKER END ******************************
            
    request.logout();

    response.redirect("/login");

    });
});