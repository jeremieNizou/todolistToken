"use strict"

var myApp = angular.module("myApp", ["ngRoute", "ngAnimate", "ngSanitize", 'ngStorage']);

myApp.controller('app', [ '$scope', 'logAjax', function($scope, logAjax) {
	$scope.log = {};

	logAjax.isLogged().then(function(data) {
		$scope.log.isLogged = data.data;
	}, function() {
		$rootScope.error = 'Failed to isLogged';
	});
	logAjax.isAdmin().then(function(data) {
		$scope.log.isAdmin = data.data;
	}, function() {
		$rootScope.error = 'Failed to isLogged';
	});
}]);