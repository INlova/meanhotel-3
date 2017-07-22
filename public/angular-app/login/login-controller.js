angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;

    vm.isLoggedin = function(){
        if (AuthFactory.auth){
            return true;
        }else{
            return false;
        }
    }
    vm.login = function() {
        if (vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
            };

            $http.post('api/users/login', user).then(function(res){
                if (res.data.success){
                    $window.sessionStorage.token = res.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                }
            }).catch(function(err){
                console.log(err);
            })
        }

    }
    
    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    }
}