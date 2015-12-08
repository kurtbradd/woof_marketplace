// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.when('', '/');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('app', {
      url: '',
      controller: 'AppCtrl',
      views: {
        'navbar': {
          templateUrl: 'js/core/templates/navbar.tpl.html',
        },
        'main': {
          templateUrl: 'js/core/templates/main.tpl.html'
        },
        'footer': {
          templateUrl: 'js/core/templates/footer.tpl.html'
        }
      }
    })
    .state('404', {
      url: '/404',
      templateUrl: 'js/core/templates/404.tpl.html',
      controller: 'AppCtrl'
    });

}]);