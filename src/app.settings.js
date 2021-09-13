(function () {
  'use strict';
  const env = process.env;

  angular.module('app').constant('appSettings', {
    appName: env.AJS_APP_NAME,
    companyShortName: env.AJS_APP_COMPANY_SHORT_NAME,
    companyName: env.AJS_APP_COMPANY_NAME,
    debugMode: env.NODE_ENV === 'development',
    version: env.AJS_APP_VERSION
  });
})();
