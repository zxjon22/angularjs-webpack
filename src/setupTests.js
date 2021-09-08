import angular from 'angular';
import 'angular-mocks';
import 'angular-i18n/angular-locale_en';
import localesEn from './locales/en.json';
import './index.js';

/**
 * Global configuration for unit tests.
 */
beforeEach(angular.mock.module('app'));

/**
 * angular-translate / tmhDynamicLocale setup.
 * Use custom loader to always use locales/en.json in tests, regardless
 * of browser language. tmhDynamicLocale is mocked out and the default
 * angular-locale_en.js is loaded directly via import.
 */
beforeEach(
  angular.mock.module('app', function ($provide, $translateProvider) {
    $provide.factory('localeEnLoader', function ($q) {
      return function () {
        return $q.resolve(localesEn);
      };
    });

    $translateProvider.useLoader('localeEnLoader');

    $provide.factory('tmhDynamicLocale', function () {
      var service = {
        set: angular.noop
      };

      return service;
    });
  })
);

/**
 * Infastructure mocks.
 */
beforeEach(
  angular.mock.module('app', function ($provide) {
    var userProfile = {
      id: 2,
      given_name: 'Joe',
      family_name: 'Bloggs',
      locale: 'en'
    };

    $provide.factory('userProfileService', function ($q) {
      var service = jasmine.createSpyObj('userProfileService', {
        getUserProfile: userProfile,
        loadUserProfile: $q.resolve(userProfile),
        clearUserProfile: undefined
      });

      return service;
    });

    $provide.factory('lookupsService', function ($q) {
      var service = jasmine.createSpyObj('lookupsService', {
        load: $q.resolve([]),
        getSkuPaymentSplitTypes: $q.resolve([]),
        getSellerStores: $q.resolve([])
      });

      return service;
    });
  })
);
