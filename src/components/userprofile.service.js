(function () {
  'use strict';

  angular.module('app').factory('userProfileService', userProfileService);

  userProfileService.$inject = ['$q', 'localeService'];

  /* @ngInject */
  function userProfileService($q, localeService) {
    var userProfile;

    var fakeUserProfile = {
      id: 2,
      firstName: 'Jonathan',
      lastName: 'Needle'
    };

    var service = {
      getUserProfile: function () {
        return userProfile;
      },
      loadUserProfile: loadUserProfile
    };
    return service;

    ////////////////

    /**
     * Fakes loading the currently logged on user's profile.
     */
    function loadUserProfile() {
      return $q
        .resolve({ data: fakeUserProfile })
        .then(function (response) {
          userProfile = angular.copy(response.data);

          if (!userProfile.locale) {
            userProfile.locale = localeService.getClientLocale();
          }

          return localeService.switchLanguage(userProfile.locale);
        })
        .then(function () {
          return userProfile;
        });
    }
  }
})();
