import angular from 'angular';
import './homepage.controller';

angular.module('app').config(routes);

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    parent: 'master',
    views: {
      '@layout': {
        templateUrl: 'home/homepage.template.html',
        controller: 'HomePageController',
        controllerAs: 'vm'
      }
    }
  });
}
