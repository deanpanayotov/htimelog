'use strict';
function init() {
    window.init(); // Calls the init function defined on the window
}

/* Controllers */

var htimelogControllers = angular.module('htimelogControllers', []);

htimelogControllers.controller("LogTimeCtrl", ['$scope', '$location', '$window',
    function ($scope, $location, $window) {

        var CLIENT_ID = '1048537626856-271aj2p8ljpsd8krp81ac4rrtm9eedqi.apps.googleusercontent.com';

        var SCRIPT_ID = "Mi3wjaNsbgXzEAybwTrJz_F1cxYePCcw0";

        var SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://spreadsheets.google.com/feeds'];

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
                {client_id: CLIENT_ID, scope: SCOPES, immediate: true   },
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
            console.log("AAAA");

            var request = {
                'function': 'getAllEntries'
            };

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
                    var result = resp.response.result;
                    $window.alert(result);
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