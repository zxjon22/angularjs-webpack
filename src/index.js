import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './sass/index.scss';

import './app.module';
import './app.settings';
import './app.routes';

console.log('Built by webpack!');

const isDevelopment = process.env.NODE_ENV;
console.log(`Environment is ${isDevelopment}.`);
