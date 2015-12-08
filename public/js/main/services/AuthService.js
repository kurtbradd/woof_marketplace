'use strict';

app.factory('AuthService', authService);

authService.$inject = ['$window'];

function authService ($window) {
	var service = {};

	service.saveToken = function (token) {
		$window.localStorage['jwtToken'] = token;
	}

	service.getToken = function () {
		return $window.localStorage['jwtToken'];
	}

	service.deleteToken = function () {
		$window.localStorage.removeItem('jwtToken');
	}

	return service;
}