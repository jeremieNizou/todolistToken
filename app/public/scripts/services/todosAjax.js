'use strict';

myApp.factory('todosAjax', function ($http) {
	return{
		afficheAll: function(){
			return $http.get("/todos").then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				});
		},
		afficheItem: function(id){
			return $http.get("/todos/" + id).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				});
		},
		modifieItem: function(id, newItem){
			return $http.put("/todos/" + id, newItem).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				});
		},
		ajouteItem: function(item){
			return $http.post("/todos", item).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				});
		},
		supprimeItem: function(id){
			return $http.delete("/todos/" + id).then(
				function successCallback(success) {
					return success;
				}, 
				function errorCallback(error) {
					return error;
				});
		}
	}
});
