App.factory('db', [
	'$firebase', function($firebase) {
		return new Firebase("https://secret.firebaseio.com/sessions");
	}
]);