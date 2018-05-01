"use strict";

myApp.controller("loginCtrl", ['$rootScope', '$scope', '$location', '$localStorage', '$window', 'logAjax', function($rootScope, $scope, $location, $localStorage, $window, logAjax) {
	$scope.signin = function() {
		var formData = {
			email: $scope.email,
			password: $scope.password
		}
		logAjax.signin(formData).then(function(res) {
			if (res.data.type == false) {
				alert(res.data.data)    
			} else {
				$localStorage.token = res.data.token;
				$scope.log.isLogged = true;
				logAjax.isAdmin().then(function(data) {
					$scope.log.isAdmin = data.data;
				}, function() {
					$rootScope.error = 'Failed to isLogged';
				});
				$location.path('/home');
			}
		}, function() {
			$rootScope.error = 'Failed to signin';
		})
	};

	$scope.signup = function() {
		var formData = {
			email: $scope.email,
			password: $scope.password,
			role: "user"
		}

		logAjax.signup(formData).then(function(res) {
			if (res.data.type == false) {
				alert(res.data.data)
			} else {
				$localStorage.token = res.data.token;
				$scope.log.isLogged = true;
				logAjax.isAdmin().then(function(data) {
					$scope.log.isAdmin = data.data;
				}, function() {
					$rootScope.error = 'Failed to isLogged';
				});
				$location.path('/home');
			}
		}, function() {
			$rootScope.error = 'Failed to signup';
		})
	};

	$scope.me = function() {
		logAjax.me().then(function(res) {
			$scope.myDetails = res.data.data;
		}, function() {
			$rootScope.error = 'Failed to fetch details';
		})
	};

	$scope.logout = function() {
		$scope.log.isLogged = false;
		$scope.log.isAdmin = false;
		logAjax.logout();
	};

}])
	
