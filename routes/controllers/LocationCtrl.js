var restify = require('restify');
var async = require('async');
var db = require('../../models/index.js');
var _ = require('lodash');

module.exports = {


	getLocations: function getLocations (req, res, next) {

		var queryparams = {
			include: [{
				model: db.State, as: 'states',
				include: [{ model: db.City, as: 'cities'}]
			}]
		}

		db.Country.findAll(queryparams).then(function (locations) {
			return res.send(200, {locations: locations});
		}).catch(next);
	},

}