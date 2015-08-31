App.factory 'collection', [ '$http', ($http) ->

	class collection
		constructor: (@http) ->
			@query = {}

		exec: (cb) ->
			type = @query.type||'find'
			delete @query.type

			$http
				.get "#{@http}/#{type||'find'}?query=#{JSON.stringify @query}"
				.then (response) -> cb response.data.err, response.data.result

		limit: (limit) ->
			@query.l = parseInt limit

		skip: (skip) ->
			@query.s = parseInt skip

		insert: (query, cb) ->
			@query =
				'type': "insert"
				'q': query

			@

		find: (query, projection) ->
			@query =
				'type': "find"
				'q': query
				'p': projection

			@

		findOne: (query, projection, cb) ->
			@query =
				'type': "findOne"
				'q': query
				'p': projection

			@

		update: (query, projection, wc) ->
			@query =
				'type': "update"
				'q': query
				'p': projection
				'wc': wc

			@


		remove: (query, cb) ->
			@query =
				'type': "remove"
				'q': query

			@

]