App.service 'udb', ['$http', 'connection', ($http, connection) ->

	new connection
		'port': "3000"
		'db': "users",
		[
			"portlight"
		]

]