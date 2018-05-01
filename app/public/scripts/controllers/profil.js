"use strict";

myApp.controller("profilCtrl", ['$rootScope', '$scope', 'logAjax', '$location', function($rootScope, $scope, logAjax, $location) {
	
	logAjax.profil().then(function(res) {
		$scope.myDetails = res.data.data;
	}, function() {
		$rootScope.error = 'Failed to fetch details';
	});

}]);