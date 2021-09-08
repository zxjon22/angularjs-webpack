// Application - these must come first.
import './app.module';
import './app.config';
import './app.settings';
import './app.routes';

// Dynamically require so Webpack finds them all.
// Allows porting from iife components without code changes.
const components = require.context('.', true, /^.*\/(?!.*spec|app|setupTests|index).*\.js$/);
components.keys().forEach(components);

// CSS
import 'animate.css';
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './sass/index.scss';

const isDevelopment = process.env.NODE_ENV;
console.log(`Environment is ${isDevelopment}.`);
