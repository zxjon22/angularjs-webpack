import './sass/index.scss';
import SvgImage from './assets/undraw_experience_design_eq3j.svg';
import 'font-awesome/css/font-awesome.css';

console.log('Built by webpack!');

const isDevelopment = process.env.NODE_ENV;
console.log(`Environment is ${isDevelopment}.`);

console.log(SvgImage);
