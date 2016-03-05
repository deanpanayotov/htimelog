'use strict';

var htimelogApp = angular.module('htimelogApp', [
  'ngRoute',
  'htimelogControllers',
  'htimelogServices'
]);

htimelogApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/intro', {
      templateUrl: 'partials/intro.html',
    }).
    when('/log-time', {
      templateUrl: 'partials/log-time.html',
      controller: 'LogTimeCtrl'
    }).
    otherwise({
      redirectTo: '/intro'
    });
  }]);
