import angular from 'angular';
import './nav.controller';
import './sidebar.controller';
import './footer.controller';

angular.module('app').config(routes);

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
    .state('layout', {
      // Base state with views for a header (nav), sidebar, content area
      // and footer. Parent state for states that don't require the user
      // to be authenticated
      abstract: true,
      views: {
        '@': {
          template: require('./layout.template.html')
        },
        'nav@layout': {
          template: require('./nav.template.html'),
          controller: 'NavController',
          controllerAs: 'vm'
        },
        'sidebar@layout': {
          template: require('./sidebar.template.html'),
          controller: 'SidebarController',
          controllerAs: 'vm'
        },
        'footer@layout': {
          template: require('./footer.template.html'),
          controller: 'FooterController',
          controllerAs: 'vm'
        }
      }
    })
    .state('master', {
      // Base state for all states that require the user to be authenticated
      // User profile is guaranteed to be loaded before the controller is
      // instantiated
      abstract: true,
      parent: 'layout'
      /*resolve: {
        userProfile: [
          'appSettings',
          'userProfileService',
          'lookupsService',
          function (appSettings, userProfileService, lookupsService) {
            var user;

            return userProfileService
              .loadUserProfile()
              .then(function (authUser) {
                user = authUser;
                return lookupsService.load(user);
              })
              .then(function () {
                return user;
              });
          }
        ]
      }*/
    });
}
