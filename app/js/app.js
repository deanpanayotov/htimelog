'use strict';

var htimelogApp = angular.module('htimelogApp', [
  'ngRoute',
  'htimelogControllers',
  'htimelogServices'
]);

htimelogApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/authorize', {
      templateUrl: 'partials/authorize.html',
      controller: 'AuthorizeCtrl'
    }).
    when('/checkfolder', {
      templateUrl: 'partials/check-folder.html',
      controller: 'CheckFolderCtrl'
    }).
    when('/logtime', {
      templateUrl: 'partials/log-time.html',
      controller: 'LogTimeCtrl'
    }).
    otherwise({
      redirectTo: '/authorize'
    });
  }]);
