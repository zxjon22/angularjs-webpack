import angular from 'angular';

angular.module('app').controller('HomePageController', HomePageController);

HomePageController.$inject = ['userProfile'];

function HomePageController(userProfile) {
  var vm = this;
  vm.title = 'HomePageController';
  vm.userProfile = userProfile;

  activate();

  function activate() {}
}
