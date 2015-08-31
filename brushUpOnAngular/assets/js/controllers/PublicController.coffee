App.controller "PublicCtrl", [
	"$scope"
	"$rootScope"
	"$location"
	"$routeParams"
	"$http"
	"db"
	($scope, $rootScope, $location, $routeParams, $http, db) ->
		$rootScope.title = "Home"


]
