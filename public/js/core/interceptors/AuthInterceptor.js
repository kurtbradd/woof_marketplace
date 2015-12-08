'use strict';

app.factory('AuthInterceptor', authInterceptor);

authInterceptor.$inject = ['AuthService'];

function authInterceptor (AuthService) {
	var interceptor = {};

	interceptor.request = function (config) {
		var token = AuthService.getToken();
		if (token) {
			var authHeader = 'Bearer ' + token;
			config.headers.Authorization = authHeader;
		}

		return config;
	}

	interceptor.response = function (res) {
		var token = res.data.token;
		if (token) AuthService.saveToken(token);
		return res;
	}

	return interceptor;
}