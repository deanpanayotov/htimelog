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

htimelogControllers.controller("AuthorizeCtrl", ['$scope', '$location', '$window', '$rootScope',
  function($scope, $location, $window, $rootScope) {

    var CLIENT_ID = '413534765896-1m71sh3gqqqqc4uht0ve7ircjrci96i1.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/drive'];

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    $scope.authorize = function(){
      gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
      return false;
    }

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
      if(authResult){
        if(!authResult.error){
          $rootScope.$apply(function () {
            $location.path("/checkfolder")
          });
        }else{
          $window.alert(authResult.error);
        }
      }else{
        $window.alert("An error occurred!");
      }
    }
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