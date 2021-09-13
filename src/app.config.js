(function () {
  'use strict';
  angular.module('app').config(config).run(run);

  config.$inject = [
    '$translateProvider',
    '$qProvider',
    '$logProvider',
    'appSettings',
    'tmhDynamicLocaleProvider'
  ];

  /* eslint max-params: ["error", 12] */
  function config(
    $translateProvider,
    $qProvider,
    $logProvider,
    appSettings,
    tmhDynamicLocaleProvider
  ) {
    $qProvider.errorOnUnhandledRejections(appSettings.debugMode);
    $logProvider.debugEnabled(appSettings.debugMode);
    $translateProvider.useLoader('i18nLoader');

    // NOTE: en-GB is registered so that the date/time formats are used even though
    //       the translations fall back to en.
    $translateProvider
      .registerAvailableLanguageKeys(['qps-ploc', 'en', 'en-GB', 'fr', 'it', 'de', 'es'], {
        'en-*': 'en',
        'fr-*': 'fr',
        'it-*': 'it',
        'de-*': 'de',
        'es-*': 'es'
      })
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('sanitizeParameters');

    tmhDynamicLocaleProvider
      .localeLocationPattern('locales/angular-locale_{{locale}}.js')
      .defaultLocale('en');
  }

  run.$inject = ['transitionHooksService'];

  function run(transitionHooksService) {
    // UI-Router transition hooks
    transitionHooksService.registerTransitionHooks();
  }
})();
