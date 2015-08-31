App.controller "ProductsCtrl", [
	"$scope"
	"$rootScope"
	"$location"
	"$http"
	"db"
	($scope, $rootScope, $location, $http, db) ->
		$rootScope.title = "Products"
		$scope.SKU = $location.$$search.SKU

		$scope.search = ->
			search = '$regex': $scope.SKU

			projection =
				"SKU": 1
				"ASIN": 1
				"AmazonTitle": 1

			db.products
				.find search, projection
				.exec (err, result) -> $scope.products = result

		$scope.search()

]
