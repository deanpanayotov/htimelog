'use strict';
function init() {
    window.init(); // Calls the init function defined on the window
}

/* Controllers */

var htimelogControllers = angular.module('htimelogControllers', []);

htimelogControllers.controller("LogTimeCtrl", ['$scope', '$location', '$window',
    function ($scope, $location, $window) {

        var CLIENT_ID = '891544193306-ma06907h97ia91gdjm13ffve4hvdklmb.apps.googleusercontent.com';

        var SCRIPT_ID = "MadYrfaDmNmdzHVvXGY39RqSmyG-wBho1";

        var SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://spreadsheets.google.com/feeds'];

        $scope.text="test";
        $scope.category="test";

        $scope.entries = [];
        $scope.timestamp = 0;

        $window.init = function () {
            console.log("ddd");
            $scope.$apply($scope.authorize);
        };

        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        $scope.authorize = function () {
            console.log("ddd f");
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: false   },
                $scope.handleAuthResult);
            return false;
        }

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        $scope.handleAuthResult = function(authResult) {
            if (authResult) {
                if (!authResult.error) {
                    $scope.getAllEntries();
                } else {
                    $window.alert(authResult.error);
                }
            } else {
                $window.alert("An error occurred!");
            }
        }

        $scope.getAllEntries = function() {
            console.log("getAllEntries");

            var request = {
                'function': 'getAllEntries'
            };
            $scope.executeGAPIRequest(request, $scope.parseEntries);
        }

        $scope.getEntries = function() {
            console.log("getEntries");

            var request = {
                'function': 'getEntries',
                'parameters': [$scope.timestamp]
            };
            $scope.executeGAPIRequest(request, $scope.parseEntries);
        }

        $scope.putEntry = function() {
            console.log("putEntry");
            var request = {
                'function': 'putEntry',
                'parameters': [$scope.text, $scope.category, $scope.timestamp]
            };
            console.log("ts "+$scope.timestamp);
            $scope.executeGAPIRequest(request, function(resp){
                $scope.text = "";
                $scope.category = "";
                $scope.parseEntries(resp);
            });
        }

        $scope.parseEntries = function(resp){
            var result = JSON.parse(resp.response.result);
            console.log(resp.response.result);
            console.log(result);
            console.log(result.entries);
            for(var i=0; i< result.entries.length; i++){ //TODO why isn't foreach working?
                $scope.entries[result.entries[i].id] = result.entries[i].data;
            }
            $scope.timestamp = result.timestamp;
            $scope.$apply();
        }

        $scope.executeGAPIRequest = function(request, onSuccess){

            var op = gapi.client.request({
                'root': 'https://script.googleapis.com',
                'path': 'v1/scripts/' + SCRIPT_ID + ':run',
                'method': 'POST',
                'body': request
            });

            op.execute(function (resp) {
                if (resp.error && resp.error.status) {
                    $window.alert('Error calling API:' + JSON.stringify(resp, null, 2));
                } else if (resp.error) {
                    var error = resp.error.details[0];
                    $window.alert('Script error message: ' + error.errorMessage);
                } else {
                    onSuccess(resp);
                }
            });
        }
    }]);

htimelogControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
    function ($scope, Phone) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
    }]);

htimelogControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    function ($scope, $routeParams, Phone) {
        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);