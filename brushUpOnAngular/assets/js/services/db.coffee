App.service 'db', ['$http', 'connection', ($http, connection) ->

	new connection
		'port': "3000"
		'db': "channeladvisor",
		[
			"products"
		]

]