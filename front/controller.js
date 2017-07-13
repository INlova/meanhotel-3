angular.module('myApp').controller('MyController', MyController).controller('AboutController', AboutController);

function MyController($http){
    var vm = this;

    $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(res){
        vm.res = res.data;
    })
    vm.name = 'Jose';
}

function AboutController() {
    var vm = this;
    vm.about = 'roberts ihe best';}