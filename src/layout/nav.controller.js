import angular from 'angular';

angular.module('app').controller('NavController', NavController);

NavController.$inject = ['appSettings', '$window', '$scope'];

function NavController(appSettings, $window, $scope) {
  var vm = this;
  vm.title = 'NavController';
  vm.signOut = signOut;
  vm.toggleNavbarMenu = toggleNavbarMenu;
  vm.showNavbarMenu = false;
  vm.toggleUserMenu = toggleUserMenu;
  vm.showUserMenu = false;

  activate();

  function activate() {
    // The navbar shows on non-authenticated pages as well so we can't
    // just inject 'userProfile' and use that.
    var unregister = $window.addEventListener('click', onClickEvent);
    $scope.$on('$destroy', unregister);
  }

  ////////

  function signOut() {
    $window.alert('Signed out!');
  }

  function toggleNavbarMenu(e) {
    e.stopPropagation();
    e.preventDefault();
    vm.showNavbarMenu = !vm.showNavbarMenu;
  }

  function toggleUserMenu(e) {
    e.stopPropagation();
    e.preventDefault();
    vm.showUserMenu = !vm.showUserMenu;
  }

  function onClickEvent() {
    $scope.$apply(function () {
      vm.showNavbarMenu = false;
      vm.showUserMenu = false;
    });
  }
}
