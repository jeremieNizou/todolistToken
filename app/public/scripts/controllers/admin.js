"use strict";

myApp.controller("adminCtrl", ['$scope', 'logAjax', '$location', function($scope, logAjax, $location) {

	logAjax.afficheAllUsers().then(function(data) {
		if( data === "err" ) {
			alert("Probleme affiche");
		}
		else {
			$scope.users = data.data.data;
		}
	});
	
}]);