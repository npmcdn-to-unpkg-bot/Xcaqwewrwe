'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','ngAnimate', 'ngMessages', 'myApp.filters', 'myApp.services', 'myApp.directives','luegg.directives']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'partials/manager/home',
        controller: 'homecontroller'
    }).when('/profile', {
        templateUrl: 'partials/profile',
        controller:'profilecontroller'
        
    }).when('/team', {
        templateUrl: 'partials/manager/team',
        controller: 'teamcontroller'
        
    }).when('/addteam', {
        templateUrl: 'partials/manager/addteam',
        controller: 'addteamcontroller'
        
    }).when('/department', {
        templateUrl: 'partials/manager/department',
        controller: 'departmentcontroller'

    }).when('/adddepartment', {
        templateUrl: 'partials/manager/adddepartment',
        controller: 'adddepartmentcontroller'
        
    }).when('/department/:name', {
        templateUrl: 'partials/manager/indepartment',
        controller: 'indepartmentcontroller'

    }).when('/project',{
            templateUrl: 'partials/manager/project',
            controller: 'projectcontroller'
        
    }).when('/addproject',{
        templateUrl: 'partials/manager/addproject',
        controller: 'addprojectcontroller' 
    })
    .when('/project/:name',{
    templateUrl: 'partials/manager/inproject',
    controller: 'inprojectcontroller'
    })
        
        
            
        .when('/formAdded', {
            templateUrl: 'partials/formAdded',
            controller: 'formcontrollered',
            controllerAs: 'formcntrled'
        })

        .when('/deletePost/:id', {
            templateUrl: 'partials/deletePost',
            controller: DeletePostCtrl
        }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}])
.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

/*
angular.module('myloginApp', ['ngRoute', 'ngMessages', 'myApp.filters', 'myApp.services', 'myApp.directives']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'partials/login-username',
        controller:'logincontroller'
    }).when('/loginPassword', {
        templateUrl: 'partials/login-password',
        controller:'logincontroller'
    });
    $locationProvider.html5Mode(true);
}]);

*/
