'use strict';

app.controller('SignUpCtrl', signupCtrl);

signupCtrl.$inject = ['$scope', '$state', 'SessionService'];

function signupCtrl ($scope, $state, SessionService) {

	$scope.form = {};

	$scope.submitForm = function () {
		SessionService.register($scope.form, function (err, user) {
			if (err) return console.error(err);
			console.log(user);
		});
	}
}