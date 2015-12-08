'use strict';

app.factory('ProfileService', profileService);

profileService.$inject = ['$http'];


function profileService ($http) {

	var service = {};

	service.getProfile = function (cb) {
		$http.get('/user/1').then(function (data) {
			return cb(null, data.data.user);
		}, cb);
	}

	return service;
}