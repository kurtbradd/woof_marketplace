var app = angular.module('app', ['ui.router']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope._ = window._;
}]);

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor')
})