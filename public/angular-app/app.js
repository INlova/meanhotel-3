angular.module('meanhotel', ['ngRoute']).config(config);
// .config('HotelsController', HotelsController);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/main/main.html'
    })
    .when('/hotels', {
        templateUrl: 'angular-app/hotel-list/hotel.html',
        controller: HotelsController,
        controllerAs: 'vm'
    })
    .when('/hotel/:id', {
        templateUrl: 'angular-app/hotel-display/hotel.html',
        controller: HotelController,
        controllerAs: 'vm'
    })

    .when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: RegisterController,
        controllerAs: 'vm'
    })
    .otherwise({
        redirectTo: '/'
    });
}

// function HotelsController(){
//     var vm = this;
//     vm.title = 'MEAN Hotel App';
// }