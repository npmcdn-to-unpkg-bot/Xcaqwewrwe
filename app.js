/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var passport = require("passport");
require("./routes/authentication/passport-init");

var http = require('http').Server(app);
var io = require('socket.io')(http);



//require('./routes/authentication/auth')(io);


var MongoClient = require('mongodb').MongoClient;
var db = require("./routes/database");
var mongoose = require('mongoose');

routes = require('./routes');
    api = require('./routes/api');


// Configuration


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/angular-1.5.8'));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// ****************************     PASSPORT-START     ***************************
app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/testbay' , function (req, res) {
    res.render('testbay')
});



var authRouter = require("./routes/authentication/auth");
app.use(authRouter);

var newuserRouter = require("./routes/authentication/newuser");
app.use(newuserRouter);




app.use(function (request,response, next) {
    if(request.isAuthenticated()){
        next();
        return;
    }
    response.redirect("/login");
});





// ****************************     PASSPORT-END     ***************************
// Routes

app.get('/home', function (req, res) {
    io.on('connection', function(socket){
        socket.broadcast.emit('log');
    });
    data = req.session.passport.user;



 //***************************   ONLINE TRACKER START ******************************


    MongoClient.connect(db, function(err, db) {
        if(err) throw err;
        var query = { euname :req.user.username  };
        doc = {$set:{status:"online" }};
        db.collection('profiles').update(query, doc, function(err, updated) {
            if(err) throw err;
            console.log( req.user.username +" is Online");
            return db.close();
        });



    });


    //***************************   ONLINE TRACKER END ******************************



    if (req.user.role === "manager"){res.render('index' ,data );}
    else{res.render('testbay');}
    
});

var managerRouter = require("./routes/manager/manager");
app.use(managerRouter);
//******************************    SOCKET-START    *********************************

io.on('connection', function(socket){
    /*console.log('User1 has been connected');
    socket.on('disconnect', function(){
        console.log('User has been disconnected');
    });
        */
    socket.on('chat message', function(msg){
      //  socket.broadcast.emit('chat message', msg);
        //console.log(sock);
      });


    socket.on('logoff' , function (msg) {
        socket.broadcast.emit('logoff');
    });
    //socket.on('logintest', function (msg) {
       // console.log('success')
    //})

    socket.on('refresh', function(msg){
        io.emit('refresh', msg);
    });

    socket.on('addmsgio', function(msg){
        io.emit('addmsgio', msg);
    });

});

//******************************    SOCKET-END    *********************************


//******************************    PARTIALS-START    *********************************

//*********************   GENERAL *************
app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

app.get('/partials/manager/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/manager/' + name);
});


//******************************      ROUTERS-START      *********************************


var apiRouter = require("./apiRouter");
app.use(apiRouter);





app.get('*', function (req, res) {
    res.render('index');
});

// Start server
var port = Number(process.env.PORT || 3000);
http.listen(port ,  function () {

    console.log("Express server listening on port 3000");
});
