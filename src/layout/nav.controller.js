import angular from 'angular';

angular.module('app').controller('NavController', NavController);

NavController.$inject = ['$window', '$scope', 'userProfileService', 'localeService'];

function NavController($window, $scope, userProfileService, localeService) {
  var vm = this;
  vm.title = 'NavController';
  vm.userProfile = userProfileService.getUserProfile;
  vm.isPseudoLocalized = false;
  vm.signOut = signOut;
  vm.togglePseudoLocalizer = togglePseudoLocalizer;
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

  function togglePseudoLocalizer() {
    vm.isPseudoLocalized ^= true;
    localeService.switchLanguage(vm.isPseudoLocalized ? 'qps-ploc' : vm.userProfile().locale);
  }
}
