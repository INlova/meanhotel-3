angular.module('meanhotel', ['ngRoute'])
.config(config)
.config('HotelsController', HotelsContoller);

function config($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/hotels.html',
        controller: HotelsContoller,
        controllerAs: 'vm'
    });
}

function HotelsContoller(){
    var vm = this;
    vm.title = 'MEAN Hotel App';
}