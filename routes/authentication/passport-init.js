/**
 * Created by Jazz on 5/31/2016.
 */
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var db = require("../database");

passport.use(new LocalStrategy(function(username, password, done){


    MongoClient.connect(db, function(err, db) {
        if(err) throw err;

        var query = { uname : username };

        db.collection('users').findOne(query, function(err, doc) {
            if(err) throw err;
            if(doc === null){
                done(null, false);
                return;
            }

            passwrd = doc.password;

            //console.dir("Successfully deleted a document!");
            
            //****varibales that is need to be sent over 'user' object in the request********
            var user = {username:username,password:doc.password , role:doc.role};
            if(!user || user.password !== password){
                done(null, false);
                return;
            }

            done(null, user);
            return db.close();
        });
    });



}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});