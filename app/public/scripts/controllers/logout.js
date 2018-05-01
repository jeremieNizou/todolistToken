"use strict";

myApp.controller("logoutCtrl", ['logAjax', '$scope', function(logAjax, $scope) {

	$scope.log.isLogged = false;
	$scope.log.isAdmin = false;
	logAjax.logout();
	
}]);