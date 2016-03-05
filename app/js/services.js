'use strict';

/* Services */

var htimelogServices = angular.module('htimelogServices', []);

htimelogServices.factory('initHTLFolder', function ($http) {
  return $http.get('http://my.ip.address/getUser?u=3', { cache: false });
});
