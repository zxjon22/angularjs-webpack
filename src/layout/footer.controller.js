(function () {
  'use strict';
  angular.module('app').controller('FooterController', FooterController);

  FooterController.$inject = ['appSettings'];

  function FooterController(appSettings) {
    var vm = this;
    vm.title = 'FooterController';
    vm.version = appSettings.version;
    vm.year = new Date().getFullYear();
    vm.companyName = appSettings.companyName;

    activate();

    function activate() {}
  }
})();
