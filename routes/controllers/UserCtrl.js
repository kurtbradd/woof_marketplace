var restify = require('restify');
var async = require('async');
var db = require('../../models/index.js');
var _ = require('lodash');

module.exports = {

	// HTTP GET /user
	getProfile: function getProfile (req, res, next) {
		return res.send(200);
	},


	// HTTP GET /user/:user_id
	getUserProfile: function getUserProfile (req, res, next) {
		return res.send(200);
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