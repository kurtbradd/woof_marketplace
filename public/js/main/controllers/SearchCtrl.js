app.controller('SearchCtrl', searchCtrl);

searchCtrl.$inject = ['$scope', '$stateParams', '$state', 'ListingService'];

function searchCtrl ($scope, $stateParams, $state, ListingService) {
	$scope.title = "WORKING";
	
	$scope.listings = [];
	$scope.filter = {};

	$scope.filterByCost = function (listing) {
		var cost_min = $scope.filter.cost_min;
		var cost_max = $scope.filter.cost_max;
		var filter_cost_min = cost_min ? listing.cost >= cost_min : true;
		var filter_cost_max = cost_max ? listing.cost <= cost_max : true;
		return (filter_cost_min && filter_cost_max);
	}

	$scope.filterByAge = function (listing) {
		var age_min = $scope.filter.age_min;
		var age_max = $scope.filter.age_max;
		var filter_age_min = age_min ? listing.age >= age_min : true;
		var filter_age_max = age_max ? listing.age <= age_max : true;
		return (filter_age_min && filter_age_max);
	}

	$scope.isAvailable = function (listing) {
		return listing.available;
	}

	ListingService.getListings(function (err, listings) {
		if (err) return console.error(err);
		console.log(listings);
		$scope.listings = listings;
	})
}