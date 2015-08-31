App.factory 'connection', [ 'collection', (collection) ->

	class connection
		constructor: (@http, @collections=[]) ->
			if typeof @http isnt "string"
				@opts = @http

				# Defaults
				@opts.host = if @opts.host then @opts.host else "localhost"
				@opts.port = if @opts.port then @opts.port else "80"
				@opts.db = if @opts.db then @opts.db else "test"

				@http = "http://#{@opts.host}:#{@opts.port}/#{@opts.db}"

			for col in @collections
				@[col] = new collection "#{@http}/#{col}"

]