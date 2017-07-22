angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, $routeParams, hotelDataFactory, AuthFactory) {
  var vm = this;
  var id = $routeParams.id;
  vm.isSubmitted = false;
  hotelDataFactory.hotelDisplay(id).then(function(response) {
    vm.hotel = response;
    vm.stars = _getStarRating(response.stars);
  });

  function _getStarRating(stars) {
    return new Array(stars);
  }

  vm.isLoggedIn = function(){
    if (AuthFactory.auth){
            return true;
        }else{
            return false;
        }
  };



  vm.addReview = function() {
    var postData = {
      name: vm.name,
      rating: vm.rating,
      review: vm.review
    };
    if (vm.reviewForm.$valid) {
      hotelDataFactory.postReview(id, postData).then(function(response) {
          $route.reload();
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };
}