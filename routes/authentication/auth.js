var express = require("express");
var passport = require("passport");

var router = express.Router();
module.exports = router;


//******************************    MONGOOSE CONNECTION    *********************************

var Profile = require('../../models/Profile.model');

//************************************************************************************

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

//***************************   OFFLINE TRACKER ******************************************

    var query = {euname :request.user.username  };
    doc = {$set:{status:"offline" }};

    Profile.findOneAndUpdate(query, doc , function(err, updated){
        if(err) throw err;
        console.log( query.euname +" went Offline");
    });


//*********************************************************************************

    request.logout();

    response.redirect("/login");

    });