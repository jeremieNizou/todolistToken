"use strict";

myApp.config(["$routeProvider", "$locationProvider", '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when("/login", {
			templateUrl: "/views/login.html",
			controller: "loginCtrl",
			resolve: {
				testLogged: function (logAjax) {
					return logAjax.testIsLogged();
				}
			}
		})
		.when("/logout", {
			templateUrl: "/views/logout.html",
			controller: "logoutCtrl"
		})
		.when("/home", {
			templateUrl: "/views/home.html",
			controller: "homeCtrl",
			resolve: {
				testLogged: function (logAjax) {
					return logAjax.testIsLogged();
				}
			}
		})
		.when("/profil", {
			templateUrl: "/views/profil.html",
			controller: "profilCtrl",
			resolve: {
				testLogged: function (logAjax) {
					return logAjax.testIsLogged();
				}
			}
		})
		.when("/todolist", {
			templateUrl: "/views/todolist.html",
			controller: "todolistCtrl",
			resolve: {
				testLogged: function (logAjax) {
					return logAjax.testIsLogged();
				}
			}
		})
		.when("/todolist/:id", {
			templateUrl: "/views/todo.html",
			controller: "todoCtrl",
			resolve: {
				testLogged: function (logAjax) {
					return logAjax.testIsLogged();
				}
			}
		})
		.when("/admin", {
			templateUrl: "/views/admin.html",
			controller: "adminCtrl",
			resolve: {
				testAdmin: function (logAjax) {
					return logAjax.testIsAdmin();
				}
			}
		})
		.otherwise({
			redirectTo: "/home"
		});

	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				if ($localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $localStorage.token;
				}
				return config;
			},
			'responseError': function(response) {
				if(response.status === 401) {
					$location.path('/logout');
				}
				else if(response.status === 403) {
					$location.path('/login');
				}
				return $q.reject(response);
			}
	  };
	 }]);
}]);
