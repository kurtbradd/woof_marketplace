'use strict';

app.factory('SessionService', sessionService);

sessionService.$inject = ['$http'];

function sessionService ($http) {
	var self = this;
	var service = {};
	var currentUser = {};
	var api = '/session';

	service.register = function (form, cb) {
		$http.post(api + '/register', form).then(function (res) {
			return cb(null, res.data);
		}, cb);
	}

	service.login = function (email, password, cb) {
		var params = {email: email, password: password};
		$http.post(api + '/login', params).then(function (res) {
			return cb(null, res.data);
		}, cb);
	}

	service.logout = function (cb) {
		$http.get(api + '/logout').then(function (res) {
			return cb(null, res.data);
		}, cb);
	}

	service.getCurrentUser = function () {
		return currentUser;
	}

	service.setCurrentUser = function (user) {
		currentUser = user;
	}

	return service;
}