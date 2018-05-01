'use strict';

myApp.factory('logAjax', ['$http', '$location', '$localStorage', function($http, $location, $localStorage){
	return {
		signup: function(data, success, error) {
			return $http.post('/signup', data).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		signin: function(data, success, error) {
			return $http.post('/signin', data).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		profil: function(success, error) {
			return $http.get('/profil').then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		logout: function() {
			delete $localStorage.token;
			$location.path('/login');
		},
		afficheAllUsers: function(success, error) {
			return $http.get('/users').then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		isLogged: function(success, error) {
			return $http.get('/isLogged').then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		isAdmin: function(success, error) {
			return $http.get('/isAdmin').then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		testIsLogged: function(success, error) {
			return $http.get('/isLogged').then(
				function successCallback(success) {
					if( success === "err" ) {
						alert("Probleme testIsLogged");
					}
					else {
						if( $location.$$path === "/login" ) {
							if(success.data) {
								$location.path('/home');
								return success;
							}
							else {
								return success;
							}
						}
						else if ($location.$$path === "/home") {
							if(!success.data) {
								delete $localStorage.token;
								$location.path('/login');
								return success;
							}
							else {
								return success;
							}
						}
					}
				}, 
				function errorCallback(error) {
					return error;
				})
		},
		testIsAdmin: function(success, error) {
			return $http.get('/isAdmin').then(
				function successCallback(success) {
					if( success === "err" ) {
						alert("Probleme testIsAdmin");
					}
					else {
						if(!success.data) {
							$location.path('/login');
							return success;
						}
						else {
							return success;
						}
					}
				}, 
				function errorCallback(error) {
					return error;
				})
		}
	};
}]);