(function () {
  'use strict';
  angular.module('app').factory('transitionHooksService', transitionHooksService);

  transitionHooksService.$inject = ['$rootScope', '$transitions', '$timeout'];
  function transitionHooksService($rootScope, $transitions, $timeout) {
    var service = {
      registerTransitionHooks: registerTransitionHooks
    };

    return service;

    ////////////////

    /**
     * Registers all the UI-Router transition hooks for the application
     */
    function registerTransitionHooks() {
      // Disable the spinner and show the page content on successful state
      // change for the first time. The transition hook is then unregistered
      // as it's not required anymore.
      var deregisterFn = $transitions.onSuccess({}, function () {
        // Add delay to demo the loader.
        $timeout(function () {
          if (!$rootScope.bootstrapped) {
            $rootScope.bootstrapped = {};
            deregisterFn();
          }
        }, 500);
      });
    }
  }
})();
