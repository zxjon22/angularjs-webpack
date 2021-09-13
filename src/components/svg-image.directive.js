(function () {
  'use strict';
  angular.module('app').directive('svgImage', SvgImage);

  SvgImage.$inject = [];
  function SvgImage() {
    // Usage:
    // <svg-image src="path to svg file" />
    // Creates:
    // Embeds a SVG file directly into the HTML. Used instead of `ng-include` as
    // Webpack's `html-loader` doesn't work with quoted paths,
    // e.g. <ng-include src="'../assets/test.svg'" />
    var directive = {
      restrict: 'E',
      templateUrl: getTemplateUrl
    };
    return directive;

    // eslint-disable-next-line no-unused-vars
    function getTemplateUrl(element, attrs) {
      // NOTE: Requested before $scope is available so can't
      //       interpolate unfortunately.
      return attrs.src;
    }
  }
})();
