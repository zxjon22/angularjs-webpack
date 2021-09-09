(function () {
  'use strict';

  angular.module('app').factory('localeService', localeService);

  localeService.$inject = ['$q', '$translate', 'tmhDynamicLocale'];

  function localeService($q, $translate, tmhDynamicLocale) {
    var service = {
      switchLanguage: switchLanguage,
      getClientLocale: getClientLocale
    };

    return service;

    /**
     * Switches the current language used by angular-translate and the internal
     * $locale instance to match the specified language code, if available.
     *
     * @param {string} langCode Language to switch to, e.g. en-GB
     * @returns {string|Promise} A promise that will resolve to the language code
     *          that was used.
     */
    function switchLanguage(langCode) {
      // Browsers use the dash rather than underscore so we keep to this standard.
      // The AngularJS locales on disk also assume dash.
      langCode = langCode.replace('_', '-');
      var key = $translate.negotiateLocale(langCode);

      if (angular.isUndefined(key)) {
        console.log('Application is not localized to ' + langCode + '. Falling back to English.');
        key = 'en';
      } else {
        console.log('Negotiated language is ' + key);
      }

      // AngularJS has no pseudo-locale and neither does momentjs.
      if (key !== 'qps-ploc') {
        tmhDynamicLocale.set(key.toLowerCase());
      }

      $translate.use(key);
      return $q.when(key);
    }

    /**
     * Returns the current browser/client's language key as seen by
     * angular-translate.
     * @returns {string} - Language code.
     */
    function getClientLocale() {
      return $translate.resolveClientLocale();
    }
  }
})();
