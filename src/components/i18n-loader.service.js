import angular from 'angular';

angular.module('app').factory('i18nLoader', i18nLoader);

/**
 * Custom Angular-Translate loader that loads translation files using
 * Webpack dynamic imports.
 */
i18nLoader.$inject = ['$q'];
function i18nLoader($q) {
  return (opts) => {
    return import(
      /* webpackChunkName: "[request]" */
      `../locales/${opts.key}.json`
    )
      .then((xlates) => $q.resolve(xlates.default))
      .catch(() => $q.reject(opts.key));
  };
}

i18nLoader.displayName = 'i18nLoader';
