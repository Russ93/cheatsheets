App.config [
	"$routeProvider"
	($routeProvider) ->
		$routeProvider
			.when "/",
				'templateUrl': "views/public/index.html"
				'controller': "PublicCtrl"
			.when "/user",
				'templateUrl': "views/users/index.html"
				'controller': "UserCtrl"
			.when "/products",
				'templateUrl': "views/products/index.html"
				'controller': "ProductsCtrl"
			# .when "/user/:session",
			# 	templateUrl: "views/user.html"
			# 	controller: "UserCtrl"

		# localsProvider.set
]