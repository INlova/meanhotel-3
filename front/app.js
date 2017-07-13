angular.module('myApp', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MyController',
        controllerAs: 'vm'
    }).when('/about',{
        // template: '<h1> this is the about page</h1>'
        templateUrl: 'templates/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });
}