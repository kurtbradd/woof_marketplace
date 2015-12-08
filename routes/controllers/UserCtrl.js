var restify = require('restify');
var async = require('async');
var db = require('../../models/index.js');
var _ = require('lodash');

module.exports = {

	// HTTP GET /user
	getProfile: function getProfile (req, res, next) {
		db.User.findOne({where: {user_id: req.user}}).then(function (user) {
			return res.send(200, {user: user});
		}).catch(next);
	},


	// HTTP GET /user/:user_id
	getUserProfile: function getUserProfile (req, res, next) {
		var user_id = req.params.user_id;
		if (!user_id) return next(new restify.MissingParameterError('Missing User ID'));

		db.User.findOne({
			where: {user_id: user_id}
		}).then(function (user) {
			return res.send(200, {user: user});
		}).catch(next);
	},


	// HTTP POST /user/profilepic
	updateProfile: function updateProfile (req, res, next) {
		return res.send(200);
	},


	// HTTP POST /user/password
	updatePassword: function updatePassword (req, res, next) {
		return res.send(200);
	},


	// HTTP POST /user/profile
	updateProfilePicture: function updateProfilePicture (req, res, next) {
		return res.send(200);
	}

}