// Application
import './app.module';
import './app.config';
import './app.settings';
import './app.routes';

// Components
import './components/svg-image.directive';

// CSS
import 'animate.css';
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './sass/index.scss';

const isDevelopment = process.env.NODE_ENV;
console.log(`Environment is ${isDevelopment}.`);
