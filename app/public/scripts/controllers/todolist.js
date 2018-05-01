"use strict";

myApp.controller("todolistCtrl", ['$scope', 'todosAjax', 'logAjax', '$location', function($scope, todosAjax, logAjax, $location) {

	$scope.toutSelectionne = false;
	$scope.list = [];
	$scope.selectionne = [];
	$scope.edit = [];
	$scope.todo = {};
	$scope.changeTodo = {};
	affiche();

// Fonctions CRUD
	function affiche() {
		todosAjax.afficheAll().then(function(data) {
			if( data === "err" ) {
				alert("Probleme affiche");
			}
			else {
				$scope.list = data.data;
				angular.forEach($scope.list, function(value, key) {
					$scope.selectionne[key] = false;
					$scope.edit[key] = false;
				});
			}
		});
	};

	$scope.ajouterItem = function(todo) {
		todosAjax.ajouteItem(todo).then(function(data) {
			if( data === "err" ) {
				alert("Probleme ajout");
			}
			else {
				$scope.list.push(data.data);
				$scope.todo = {};
				$scope.toutSelectionne = false;
				$scope.selectionne.push(false);
				$scope.edit.push(false);
			}
		});
	};

	$scope.supprime = function(item, index) {
		todosAjax.supprimeItem(item._id).then(function(data) {
			if( data === "err" ) {
				alert("Probleme suppression");
			}
			else {
				{
					$scope.list.splice(index, 1);
					$scope.selectionne.splice(index, 1);
					$scope.edit.splice(index, 1);

					// Si tous les autres item sont sélectionnés, il faut actualiser 'toutSelectionne'
					var nbSelectionne = 0;
					angular.forEach($scope.list, function(value, key) {
						if ($scope.selectionne[key] === true) {
							nbSelectionne++;
						}
					});
					if(nbSelectionne === $scope.list.length) {
						$scope.toutSelectionne = true;
					}
				}
			}
		});
	};

	$scope.supprimeToutSelectionne = function() {
		for (var i=$scope.list.length-1; i>=0; i--) {
			if( $scope.selectionne[i] === true ) {
				$scope.supprime($scope.list[i], i);
			}
		}
		$scope.toutSelectionne = false;
	};


// Fonctions sur la selection
	$scope.changeSelectionTotalBouton = function() {
		if( $scope.toutSelectionne === false ){
			$scope.toutSelectionne = true;
			angular.forEach($scope.selectionne, function(value, key) {
				$scope.selectionne[key] = true;
			});
		}
		else {
			$scope.toutSelectionne = false;
			angular.forEach($scope.selectionne, function(value, key) {
				$scope.selectionne[key] = false;
			});
		}
	};

	$scope.changeSelectionTotal = function() {
		if( $scope.toutSelectionne === true ){
			angular.forEach($scope.selectionne, function(value, key) {
				$scope.selectionne[key] = true;
			});
		}
		else {
			angular.forEach($scope.selectionne, function(value, key) {
				$scope.selectionne[key] = false;
			});
		}
	};

	$scope.changeSelectionIndex = function(index) {
		if( $scope.selectionne[index] === false ){
			$scope.toutSelectionne = false;
		}
		else {
			$scope.toutSelectionne = true;
			angular.forEach($scope.selectionne, function(value, key) {
				if (value === false) {
					$scope.toutSelectionne = false;
				}
			});
		}
	};


// Fonction modifier
	$scope.modifier = function(index) {
		if( $scope.edit[index] === true) {
			$scope.edit[index] = false;
			$scope.changeTodo = {};
		}
		else {
			angular.forEach($scope.edit, function(value, key) {
				$scope.edit[key] = false;
			});
			$scope.edit[index] = true;
			$scope.changeTodo.nom = $scope.list[index].nom;
		}
	};

	$scope.confirmer = function(item, index) {
		todosAjax.modifieItem(item._id, $scope.changeTodo).then(function(data) {
			if( data === "err" ) {
				alert("Probleme confirmation");
			}
			else {
				$scope.list[index].nom = $scope.changeTodo.nom;
				$scope.modifier(index);
			}
		});
	};

}]);