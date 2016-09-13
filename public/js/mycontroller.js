/**
 * Created by Jazz on 6/13/2016.
 */


angular.module('myApp')
    .controller( 'homecontroller' , ['$scope' ,'mongosrv','mdb','socket','$location','$route' ,function ($scope,mongosrv,mdb,socket , $location,$route) {



        
    } ] )

    .controller( 'appcontroller' , ['$scope' ,'mongosrv','mdb','socket','$location','$route' ,function ($scope,mongosrv,mdb,socket , $location,$route)  {

        mongosrv.getuser().then(function (result) {
            $scope.user = result;
            console.log($scope.user);
            mdb.store(result);


        });



        socket.emit('chat message', $scope.roomname);
        
        $scope.logofff = function (msg) {
            console.log("socket reached");
            socket.emit('logoff');
        };
        

    } ] )

    .controller( 'profilecontroller' , ['$scope','$routeParams','socket' ,'mdb','$location', function ($scope,$routeParams,socket,mdb,$location) {
        var tempdata = mdb.get();
        $scope.user = tempdata;
        console.log(tempdata)

    } ] )
    
    .controller( 'teamcontroller' , ['$scope','$routeParams','socket' ,'teamservice','$location', function ($scope,$routeParams,socket,teamservice,$location) {
        teamservice.getAll().then(function (result) {
            $scope.members = result;
            $scope.loading = false;
        });

        socket.on('log', function () {
            teamservice.getAll().then(function (result) {
                $scope.members = result;
                $scope.loading = false;
            });
        });
        socket.on('logoff', function (msg) {
            teamservice.getAll().then(function (result) {
                $scope.members = result;
                $scope.loading = false;
                console.log("caught it!");
            });
        });
        
        

    } ] )
    
    .controller('addteamcontroller' , [ '$scope','teamservice','socket','$route','$location', function ($scope ,teamservice,socket,$route , $location) {
        var teammember  = {};

        teamservice.getAlldept().then(function (result) {
            $scope.departments = result;
        })
        $scope.addteammember  = function () {
            teammember.name = $scope.memberName;
            teammember.role = $scope.memberRole;
            teammember.euname = $scope.membereuname;
            teammember.deptname = $scope.departments.deptname;
            teamservice.addteammemeberfunc(teammember);
            $location.path('/team');
        };
        } ] )

    .controller( 'departmentcontroller' , ['$scope','$routeParams','socket' ,'departmentservice','$location', function ($scope,$routeParams,socket,departmentservice,$location) {

            departmentservice.getAll().then(function (result) {
                $scope.departments = result;
                $scope.loading = false;
                })
        } ] )
    
    .controller( 'adddepartmentcontroller' , ['$scope','$routeParams','socket' ,'departmentservice','$location', function ($scope,$routeParams,socket,departmentservice,$location) {
            
            $scope.adddept = function () {
                var dept  = {}
                dept.name = $scope.deptName;
                departmentservice.adddeptfunc(dept);
                $location.path('/department');
            }

                


            } ] )
    
    .controller( 'indepartmentcontroller' , ['$scope','$routeParams','socket' ,'departmentservice','$location', function ($scope,$routeParams,socket,departmentservice,$location) {
        $scope.deptName = $routeParams.name;
         departmentservice.getAllteammembers($scope.deptName).then(function (result) {
             $scope.teammembers = result;
        });
    } ] )

    .controller( 'addprojectcontroller' , ['$scope','$routeParams','socket' ,'teamservice','projectservice' , '$location', function ($scope,$routeParams,socket,teamservice,projectservice,$location) {
        $scope.assignitto  = 'self';
        teamservice.getAll().then(function (result) {
            $scope.members = result;
        });

        $scope.continue = function () {
            var data = {};
            data.teamdata  = [];
            if($scope.assignitto  === 'self'){
                angular.forEach($scope.members , function (member) {
                    if (member.checked === true){
                        data.teamdata.push(member.name);
                    }

                });
                data.projectname =  $scope.projectName;
                data.projectdescription = $scope.projectdescription;
                projectservice.createproject(data);
                $location.path('/project');

            }
            if($scope.assignitto  === 'projectlead'){

                }
                
        }
        
    } ] )

    .controller( 'projectcontroller' , ['$scope','$routeParams','socket' ,'teamservice','projectservice' , '$location', function ($scope,$routeParams,socket,teamservice,projectservice,$location) {

        projectservice.getallprojects().then(function (result) {
            $scope.projects = result;
        })
    } ] )
    
    .controller( 'inprojectcontroller' , ['$scope','$routeParams','socket' ,'projectservice','$location', function ($scope,$routeParams,socket,projectservice,$location) {
        $scope.projectname = $routeParams.name;
        console.log("inside the controller");
        projectservice.getAllteammembersinproject($scope.projectname).then(function (result) {
            $scope.teammembers = result;
            console.log(result);
        });
    } ] )




    /*socket.on('refresh', function (msg) {
            var nothing = msg;
            $route.reload();
        });

        mongosrv.getAllmsg(lroomname).then(function (result) {
            console.log(result);
            $scope.roommsg = result;
        });



        $scope.addmsg = function () {
            data.message = $scope.usermessage;
            mongosrv.maddmsg(data);
            socket.emit('addmsgio' , $scope.usermessage );
            $scope.usermessage = undefined;
            //var refresh = 'nothing';
            //socket.emit('refresh', refresh);

        }
         */        



    .controller( 'addnewcontroller' , ['$scope' ,'mongosrv','$location' ,function ($scope,mongosrv , $location) {
        
        $scope.addfunc = function () {
            mongosrv.addroom($scope.roomname);
            socket.emit('chat message', $scope.roomname);
            $location.path('/home');

        }
        
    } ] )


    .controller('formcontroller', ['insertservice','mongo' , '$http', function(insertservice,mongo ,$http){
    	this.event = insertservice.sendall();
        
        this.car = [{id:'Audi' , name:'Audi'} , {id:'Porshe',name:'Porshe'} , {id:'Ferrari' , name:'Ferrari'}];
        
        this.submitform = function (form) {
            insertservice.func(angular.copy(form) , this.event);
            console.log('Event Inserted');

            //$scope.event.push(angular.copy(form));
            console.log(this.event);
           
        };
        this.submitformpost = function (form) {
            mongo.funcmongo(form);
            console.log("call from the controller");
            alert("Form has been taken....");
            this.arr = undefined;
        }


    	
    }])

    .controller('democontroller' , function ($scope , demoservice ,mongo) {
        demoservice.getallevents().then(function(result){
            $scope.friend = result;
            console.log(result);
        });
      this.deletefrnd = function (name) {

          console.log(name+" is clicked for delete acrton");
          mongo.mdelete(name);
      }

    });



/*
angular.module('myloginApp')

    .controller('logincontroller', ['$scope', 'mongosrv', function($scope,mongosrv){
        console.log("Inside ");
       cred = {};
        $scope.temp = function () {
            mongosrv.tempstore($scope.username);    
        };
        //cred.username  =$scope.username;
        //mongosrv.tempstore($scope.username);

            console.log("Inside the controller");
        $scope.auth = function () {
            //cred.password  =$scope.password;
            mongosrv.mauth($scope.password);
            
        }
    }]);


    */