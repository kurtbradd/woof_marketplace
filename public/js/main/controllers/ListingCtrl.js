app.controller('ListingCtrl', listingCtrl);

listingCtrl.$inject = ['$scope', '$stateParams', '$state', 'ListingService'];

function listingCtrl ($scope, $stateParams, $state, ListingService) {
	
	var listing_id = $stateParams.listing_id;

	ListingService.getListing(listing_id, function (err, listing) {
		if (err) return console.error(err);
		console.log(listing);
		$scope.listing = listing;
	})
}