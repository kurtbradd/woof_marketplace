'use strict';

app.factory('ListingService', listingService);

listingService.$inject = ['$http'];


function listingService ($http) {

	var service = {};

	service.getListings = function (cb) {
		$http.get('/listing').then(function (data) {
			return cb(null, data.data.listings);
		}, cb);
	}

	service.getListing = function (listing_id, cb) {
		var endpoint = '/listing/' + listing_id;
		$http.get(endpoint).then(function (data) {
			return cb(null, data.data.listing);
		}, cb);	
	}

	service.getListingImage = function (listing_id, cb) {
		var endpoint = '/listing/' + listing_id + '/images';
		$http.get(endpoint).then(function (data) {
			return cb(null, data.data.listing_images);
		}, cb);	
	}

	return service;
}