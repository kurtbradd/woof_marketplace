var TokenManager = require('../../modules/TokenManager.js');
var db 			= require('../../models/index.js');
var restify = require('restify');
var _ 			= require('lodash');
var async 	= require('async');

module.exports = {

	// HTTP POST -> /session/register
	register: function register (req, res, next) {
		var props = ['f_name', 'l_name', 'age', 'phone', 'email','password', 'description'];
		var hasKeys = _.every(props, _.partial(_.has, req.body));
		if (!hasKeys) return next(new restify.MissingParameterError('Missing Parameters'));

		db.User.create(req.body).then(function (user) {
			TokenManager.createToken(user.id, function (err, token) {
				if (err) return next(err);
				return res.send(200, {user: user, token: token});
			})
		}).catch(next);
	},


	// HTTP POST -> /session/login
	login: function login (req, res, next) {
		if (!req.body.email) return next(new restify.MissingParameterError('Missing Email'));
		if (!req.body.password) return next(new restify.MissingParameterError('Missing Password'));

		var foundUser = null;

		async.waterfall([
			function findUserInDatabase (cb) {
				db.User.findOne({ where: { email: req.body.email } })
				.then(function (user) { cb(null, user)}).catch(cb);
			},
			function compareUserPassword (user, cb) {
				if (!user) return cb(new restify.NotFoundError('Email not registered'));
				foundUser = user;
				user.comparePassword(req.body.password, cb);
			},
			function createUserAccessToken (passwordMatch, cb) {
				if (!passwordMatch) return cb(new restify.InvalidCredentialsError('Incorrect Password'));
				TokenManager.createToken(foundUser.id, cb);
			}
		], function completionHandler (err, token) {
			if (err) return next(err);
			return res.send(200, {user: foundUser, token: token});
		})
	},


	// HTTP GET /session/logout
	logout: function logout (req, res, next) {
		var token = req.authorization.credentials;
		TokenManager.expireToken(req.user, token, function (err) {
			if (err) return next(err);
			return res.send(200, {success: true});
		})
	},

	cancel: function cancel (req, res, next) { return res.send(200); },
}