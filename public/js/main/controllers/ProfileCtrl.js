app.controller('ProfileCtrl', profileCtrl);

profileCtrl.$inject = ['$scope', '$stateParams', '$state', 'ProfileService'];

function profileCtrl ($scope, $stateParams, $state, ProfileService) {

	ProfileService.getProfile(function (err, profile) {
		if (err) return console.err(err);
		console.log(profile);
		$scope.profile = profile;
	})
}