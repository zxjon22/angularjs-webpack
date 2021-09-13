// Application - these must come first.
import './app.module';
import './app.config';
import './app.settings';
import './app.routes';

// Dynamically require so Webpack finds them all.
// Allows porting from iife components without code changes.
const components = require.context('.', true, /^.*\/(?!.*spec|app|setupTests|index).*\.js$/);
components.keys().forEach(components);

// Populate the AngularJS $templateCache to avoid having to change `templateUrl: <path>` to
// `template: require('<path>')`. Adding some third party components don't work with template
// strings.
angular.module('app').run([
  '$templateCache',
  ($templateCache) => {
    const templates = require.context('.', true, /^.*\.template\.html/);
    templates.keys().forEach((key) => $templateCache.put(key.slice(2), templates(key)));
  }
]);

// CSS
import 'animate.css';
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './sass/index.scss';

const isDevelopment = process.env.NODE_ENV;
console.log(`Environment is ${isDevelopment}.`);
