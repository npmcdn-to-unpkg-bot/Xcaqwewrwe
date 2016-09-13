/**
 * Created by Jazz on 6/13/2016.
 */



angular.module('myApp')
    .service('teamservice', function($http) {
        this.addteammemeberfunc = function (data) {
            return $http.post('/teamadd', data).then(function (message) {
                console.log("Team Member has been inserted in the Database");
            })


        };

        this.getAll = function () {
            var members = $http.get('/api/team').then(function (response) {
                console.log("Team data has been sent from Database");
                doc = response.data;
                return doc;
            });
            return(members);
        };
        this.getAlldept = function () {
            var depts = $http.get('/api/department').then(function (response) {
                console.log("dept data has been sent from Database");
                doc = response.data;
                return doc;
            });
            return(depts);
        };
        
        
        })
    
    .service('departmentservice' , function ($http) {
        
        this.adddeptfunc = function (data) {
            return $http.post('/departmentadd', data).then(function (message) {
                console.log("Department has been inserted in the Database");
            });
        }

        this.getAll = function () {
            var members = $http.get('/api/department').then(function (response) {
                console.log("Team data has been sent from Database");
                doc = response.data;
                return doc;
            });
            return(members);
        };

        this.getAllteammembers = function (data) {
            var members = $http.get('/api/getteamfordept/' + data).then(function (response) {
                doc = response.data;
                return doc;
            });
            return(members);
        };

    })
    
    .service('projectservice' , function ($http , $location) {
      this.createproject = function (data) {
          return $http.post('/projectadd', data).then(function (message) {
              console.log("Project has been inserted in the Database");
          });

      };
        this.getallprojects = function () {
            var projects = $http.get('/api/projects').then(function (response) {
                console.log("Projects data has been sent from Database");
                doc = response.data;
                return doc;
            });
            return(projects);
       };

        this.getAllteammembersinproject = function (data) {
            var members = $http.get('/api/getteamforproject/' + data).then(function (response) {
                console.log("Team data has been recieved from Database");
                doc = response.data;
                console.log(doc);
                return doc;
            });
            return(members);
        }; 
    })
        
    .service('mongo' , function ($http , $location) {
        this.funcmongo = function (form) {
            return $http.post('/api/post', form).then(function (message) {

                console.log("Data has been inserted in the Database");
            })
            };
        this.mdelete = function (name) {
           return $http.get('api/delete/'+name).then(function (message) {
                $location.url('/formlist');
               console.log("Data has been deleted from the Database");
           })

        }
    })


    .service('mongosrv' , function ($http ,$location) {
    this.getuser = function () {
        var user = $http.get('/getuser').then(function (response) {
            console.log("Requesting user");
            doc = response.data;
            return doc;
        });
        return(user);   
    };

    this.getAll = function () {
        var rooms = $http.get('/rooms').then(function (response) {
            console.log("Rooms data has been sent from Database");
            doc = response.data;
            return doc;
        });
        return(rooms);
    };

    this.editroom = function (data) {
        console.log('call from the service');
         return $http.post('/edit',data).then(function(messsage) {
            console.log("Data has been Edited in the Database");
        })
    };

    this.deleteroom = function (data) {
        
        $http.post('/delete/'+data).then(function (mesaage) {
            console.log('Data has been deleted successfully!');
            $location.path('/home');
        })

    };
     this.addroom = function (data) {
         $http.post('/create/'+data).then(function (message) {
             console.log('Room has been created')
         });
     };
    this.maddmsg  = function (data) {
        console.log('inside the service');
        console.log(data.messsage);
        console.log(data.roomname);
        return $http.post('/messages/post',data).then(function (message) {
            console.log('Message has been stored')
        });
    };
        this.getAllmsg = function (data) {
            var rooms = $http.get('/messages/get/'+data).then(function (response) {
                console.log("Messages has been recieved from the Database");
                doc = response.data;
                console.log(doc);
                return doc;
            });
            return(rooms);
        };    
      
})

    .service('mdb' , function ($http ,$location) {
    
        var user = {};
        
        this.store = function (data) {
            user.username = data.username;
            user.password = data.password;
            console.log('user stored for this session')    
        }
        this.get = function () {
            console.log('giving the user of this session')
            return user;

        }    
    
    
});
    

/*angular.module('myloginApp')
    .service('mongosrv' , function ($http ,$location) {

        usercredentials = {};
        this.tempstore = function (username) {
            usercredentials.username = username;
        };

        this.mauth = function (password) {
            usercredentials.password = password;
            console.log(usercredentials.username);
            console.log(usercredentials.password);

            $http.post('/login', usercredentials).then(function (message) {
                console.log('User has been authenticated');
            })
        }
    });
*/