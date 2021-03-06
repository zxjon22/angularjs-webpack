(function () {
  'use strict';
  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {
    // No # then redirect to our app, otherwise / produces a 404
    $urlRouterProvider.when('', '/');

    $stateProvider.state('not-found', {
      // Catch all
      url: '*path',
      templateUrl: 'layout/notfound.template.html'
    });
  }
})();
