App.controller "UserCtrl", [
	"udb"
	"$rootScope"
	"$scope"
	(udb, $scope, $rootScope) ->
		$rootScope.title = "User"

		$scope.saveTheme = ->
			udb.portlight
				.update
					'_id': $rootScope.user.id,
					{'$set': 'theme': $rootScope.user.theme}
				.exec angular.noop
]
