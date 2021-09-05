import angular from 'angular';

angular.module('app').constant('appSettings', {
  debugMode: process.env.NODE_ENV,
  version: '0.1.dev'
});
