App.run [ "udb", "$rootScope", "$cookies", (udb, $rootScope, $cookies) ->
	console.log $cookies

	# udb.portlight
	# 	.findOne {'_id': "53fba4702b6a01113d562036"},
	# 		'username': 1
	# 		'firstname': 1
	# 		'lastname': 1
	# 		'theme': 1
	# 	.exec (err, result) ->
	# 		$rootScope.user =
	# 			'id': result._id
	# 			'username': result.username
	# 			'firstname': result.firstname
	# 			'lastname': result.lastname
	# 			'theme': result.theme
]