
/*Main JS for profile page - SM Technologies */
var app = angular.module('honeyonsys', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/',{templateUrl: 'views/home.html', controller: 'MainCtrl'})
    .when('/about', {templateUrl: 'views/about.html', controller: 'MainCtrl'})
    .when('/services', {templateUrl: 'views/services.html', controller: 'MainCtrl'})
    .when('/portfolio', {templateUrl: 'views/portfolio.html', controller: 'MainCtrl'})
    .when('/contact', {templateUrl: 'views/contact.html', controller: 'MainCtrl'})
    .otherwise({ redirectTo: '/' })

    
});



app.controller('MainCtrl', function ($scope, $rootScope, $location) {
    $scope.loading = true;
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
   };
});

