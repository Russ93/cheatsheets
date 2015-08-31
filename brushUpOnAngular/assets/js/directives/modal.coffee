App.directive "modal", [
	'$compile', ($compile) ->
		'restrict': "E",
		'scope':
			'title':"@",
			'target':"@"
		'templateUrl': "/views/directives/modal.html",
		'replace': true,
		'transclude': true
]