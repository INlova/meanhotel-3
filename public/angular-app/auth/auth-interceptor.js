angular.module('meanhotel').controller('AuthInterceptor', AuthInterceptor)

function AuthInterceptor($q, $window, AuthFactory){
    return{
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config){
        config.headers = config.headers || {};
        if ($window.sessionStorage.token){
            config.headers.Authorization = 'Bearer' + $window.sessionStorage.token;
        }
        return config;
    };

    function response(res){
        if (res.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn){
            AuthFactory.isLoggedIn = true;
        }
        if (res.status === 400){
            AuthFactory.isLoggedIn = false;
        }
        return res || $q.when(res);
    };

    function responseError(rejection){
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);

    };
}