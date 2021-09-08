import angular from 'angular';

describe('HomePageController', function () {
  var $controller, $rootScope, $compile;

  /**
   * Mock out directives so they don't interfere with controllers when testing
   * with a compiled template.
   */
  beforeEach(angular.mock.module('app', { svgImageDirective: {} }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('Renders correctly', function () {
    var userProfile = {
      id: 2,
      firstName: 'Joe',
      lastName: 'Bloggs',
      locale: 'en'
    };

    var $scope = $rootScope.$new();
    var vm = $controller('HomePageController as vm', {
      $scope: $scope,
      userProfile: userProfile
    });

    // Example of compiling the template. We're not using $templatecache with Webpack so we
    // just require() it instead. (Previously we would have gotten it via $templatecache which
    // would have been populated by karma-ng-html2js-preprocessor).
    var el = $compile(require('./homepage.template.html'))($scope);
    $scope.$apply();

    expect(vm.title).toEqual('HomePageController');
    expect(vm.userProfile).toEqual(userProfile);
    expect(el.html()).toContain(`Welcome, ${userProfile.firstName}`);
  });
});
