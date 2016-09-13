/**
 * Created by Jazz on 6/20/2016.
 */
var uuid = require("node-uuid");

var express = require("express");
var MongoClient = require('mongodb').MongoClient;


var bodyParser = require("body-parser");



var router = express.Router();
module.exports = router;
//var sock = {};
//module.exports = sock;

var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var db = require("./routes/database");
//                  ************SHOWING THE LIST OF ROOMS***********

//                  ************ADD A ROOM***********

router.post("/create/:name", function(request, response){
    var  room = {
        name: request.params.name,
        id : uuid.v4()
    };

    sock  = room;
        //socket.on('chat message', function(msg){
            //msg= room;
        //socket.broadcast.emit('chat message', msg);
        //});




    
    
    MongoClient.connect(db, function(err, db) {
        if(err) throw err;

        var doc = { name:room.name,id:room.id};

        db.collection('rooms').insert(doc, function(err, inserted) {
            if(err) throw err;

            console.dir("Successfully inserted: " + JSON.stringify(inserted));

            return db.close();
        });
    });
    response.redirect("rooms");

});

//                  ************EDIT A ROOM***********
router.post("/edit", function(request, response){

    var newroomname = request.body.newroomname;
    var oldroomname = request.body.oldroomname;
    console.log(newroomname);
    console.log(oldroomname);
    MongoClient.connect(db, function(err, db) {
        if(err) throw err;

        var query = { name : oldroomname };
        doc = {$set:{name:newroomname }};

        db.collection('rooms').update(query, doc, function(err, updated) {
            if(err) throw err;

            console.dir("Successfully updated a  document!");

            return db.close();
        });
    });
    response.send("successfully edited");
});


//                  ************DELETE A ROOM***********

router.post("/delete/:roomname", function (request , response) {

    var room = request.params.roomname;
    MongoClient.connect(db, function(err, db) {
        if(err) throw err;
        var query = { name : room };
        db.collection('rooms').remove(query, function(err, removed) {
            if(err) throw err;
            console.dir("Successfully deleted a document!");
            //return db.close();
        });
        db.collection('messages').remove(query, function(err, removed) {
            if(err) throw err;

            console.dir("Successfully deleted the messages!");

            return db.close();
        });
    });

    response.send("success");
});

//                  ************POSTING A MESSAGE***********


router.post("/messages/post", function(request, response){
   var roomname = request.body.roomname;
    var msgcnt = request.body.message;


    MongoClient.connect(db, function(err, db) {
        if(err) throw err;

        var doc = { msg : msgcnt , name : roomname};

        db.collection('messages').insert(doc, function(err, inserted) {
            if(err) throw err;

            console.dir("Successfully inserted: " + JSON.stringify(inserted));

            return db.close();
        });
    });



    response.send("Success");
});

//                  ************SHOWING THE MESSAGES***********


/*router.get("/messages/room", function(request, response){
    response.json($_GET['roomid']);
})
*/





router.get("/messages/get/:name", function(request, response){
    roomname = request.params.name;



    MongoClient.connect(db, function (err, db) {
        if (err) {
            throw err;
        }

        var doc = {name: roomname};
        db.collection('messages').find(doc).sort({name:1}).toArray(function (err, docm) {
            if (err) {
                throw err;
            }
            response.send(docm);
        });
    });

});