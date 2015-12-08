var restify = require('restify');
var async = require('async');
var db = require('../../models/index.js');
var _ = require('lodash');

module.exports = {


	getListings: function getListings (req, res, next) {
		db.Listing.findAll({
			include: [{model: db.ListingImage, as: 'images'}]
		}).then(function (listings) {
			return res.send(200, {listings: listings});
		}).catch(next);
	},

	getListing: function getListing (req, res, next) {
		var listing_id = req.params.listing_id;
		if (!listing_id) return next(new restify.MissingParameterError('Missing Listing Id'));

		db.Listing.findOne({where: {listing_id: listing_id}})
		.then(function (listing) {
			return res.send(200, {listing: listing});
		}).catch(next);
	},

	getListingImages: function getListingImages (req, res, next) {
		var listing_id = req.params.listing_id;
		if (!listing_id) return next(new restify.MissingParameterError('Missing Listing Id'));

		db.ListingImage.findAll({where: {listing_id: listing_id}})
		.then(function (listing_images) {
			return res.send(200, {listing_images: listing_images})
			.catch(next);
		})
	},

	createListing: function createListing (req, res, next) {
		return res.send(200);
	},

	updateListing: function updateListing (req, res, next) {
		return res.send(200);
	},

	deleteListing: function deleteListing (req, res, next) {
		return res.send(200);
	} 



}