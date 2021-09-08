describe('SvgImage directive tests', function () {
  var $compile, $rootScope, $httpBackend;

  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Loads and renders an svg correctly', function () {
    var $scope = $rootScope.$new();
    var svgUrl = '/assets/test.svg';
    var svgContent = '<svg></svg>';
    $httpBackend.whenGET(svgUrl).respond(svgContent);

    var el = $compile(`<svg-image class="has-ratio" src="${svgUrl}" />`)($scope);
    $httpBackend.flush();
    $scope.$apply();

    expect(el.html()).toContain(svgContent);
  });
});
