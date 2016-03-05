'use strict';

/* Controllers */

var htimelogControllers = angular.module('htimelogControllers', []);

htimelogControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

htimelogControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

htimelogControllers.controller("AuthorizeCtrl", ['$scope', '$location',
  function($scope, $location) {
    $scope.authorize = function() {
      $location.path("/checkfolder")
    };
  }]);

htimelogControllers.controller("CheckFolderCtrl", ['$scope', '$location',
  function($scope, $location) {
    $scope.createFolder = function() {
      $location.path("/logtime")
    };
  }]);

htimelogControllers.controller("LogTimeCtrl", ['$scope', '$location',
  function($scope, $location) {
    $scope.logTime = function() {
    };
  }]);