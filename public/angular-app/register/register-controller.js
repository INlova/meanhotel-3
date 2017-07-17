angular.module('meanhotel').controller('RegisterController', RegisterController);

function RegisterController($http){
    var vm = this;
    vm.register = function() {
        var user = {
            username: vm.username,
            password: vm.password
        };

        if(!vm.username || !vm.password){
            vm.error = 'Please add Username and Password';
        }else{
            if(vm.password !== vm.passwordRepeat){
                vm.error = 'password didnt match';
            }else{
                $http.post('/api/users/register', user).then(function(result){
                    console.log(result);
                    vm.message = 'Success';
                    vm.error = '';
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
    };
};