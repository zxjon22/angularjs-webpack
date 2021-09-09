import angular from 'angular';
import { uglifiedAlphabet, vowels, stringWrapper } from './i18n-utils';

angular.module('app').factory('i18nLoader', i18nLoader);

/**
 * Custom Angular-Translate loader that loads translation files using
 * Webpack dynamic imports.
 */
i18nLoader.$inject = ['$q'];
function i18nLoader($q) {
  return (opts) => {
    return loadLanguage(opts);
  };

  ////////

  /**
   * Loads a set of translations using Webpack dynamic imports. Each set of
   * translations is placed in its own Webpack chunk.
   *
   * @param {object} opts - Options.
   * @returns {Promise|object|string} - A promise that resolves to a set of
   * translations or is rejected with the language key, if translations
   * don't exist for a given language.
   */
  function loadLanguage(opts) {
    const isPseudoLang = opts.key === 'qps-ploc';
    const key = isPseudoLang ? 'en' : opts.key;
    const deferred = $q.defer();
    const options = angular.merge(
      {},
      {
        repeatedLetters: vowels,
        letterMultiplier: 2,
        letters: uglifiedAlphabet,
        shouldWrap: false
      },
      opts
    );

    import(
      /* webpackChunkName: "[request]" */
      `../locales/${key}.json`
    )
      .then((_module) => {
        let translations = _module.default;

        if (isPseudoLang) {
          translations = pseudoLocalize(options, translations);
        }

        return deferred.resolve(translations);
      })
      .catch(() => deferred.reject(key));

    return deferred.promise;
  }

  /**
   * Pseudolocalizes a set of translations.
   *
   * @param {object} translations - Translations to pseudo-localize.
   * @returns {object} - The pseudo-localized translations.
   */
  function pseudoLocalize(options, translations) {
    const pseudoTranslations = angular.merge({}, translations);

    const pseudo = (options, t) => {
      for (const key in t) {
        if (typeof t[key] === 'object') {
          t[key] = pseudo(options, t[key]);
        } else if (typeof t[key] === 'string') {
          t[key] = pseudoValue(options, t[key]);
        } else {
          throw Error(`${key} is not a string or object.`);
        }
      }
      return t;
    };

    pseudo(options, pseudoTranslations);
    return pseudoTranslations;
  }

  /**
   * Pseudo-localizes a string value. Takes care to skip any substitution
   * placeholders, e.g. '{{placeholder}}'.
   *
   * @see https://github.com/MattBoatman/i18next-pseudo/blob/master/src/index.js
   * @param {object} options - Options.
   * @param {string} value - The string to pseudo-localize.
   * @returns Pseudo-localized string.
   */
  function pseudoValue(options, value) {
    let bracketCount = 0;
    const processedValue = value
      .split('')
      .map((letter) => {
        if (letter === '}') {
          bracketCount = 0;
          return letter;
        }
        if (letter === '{') {
          bracketCount++;
          return letter;
        }
        if (bracketCount === 2) return letter;

        return options.repeatedLetters.indexOf(letter) !== -1
          ? options.letters[letter].repeat(options.letterMultiplier)
          : options.letters[letter] || letter;
      })
      .join('');

    return stringWrapper({ shouldWrap: false, string: processedValue });
  }
}

i18nLoader.displayName = 'i18nLoader';
