'use strict';

app.factory('SessionService', sessionService);

sessionService.$inject = ['$http'];

function sessionService ($http) {
	var service = {};
	return service;
}