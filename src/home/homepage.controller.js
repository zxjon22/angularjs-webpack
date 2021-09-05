import angular from 'angular';

angular.module('app').controller('HomePageController', HomePageController);

HomePageController.$inject = [];

function HomePageController() {
  var vm = this;
  vm.title = 'HomePageController';

  activate();

  function activate() {}
}
