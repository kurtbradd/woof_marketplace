// Sub-application/main Level State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/',
    templateUrl: 'js/main/templates/home.tpl.html',
  })
  .state('app.search', {
    url: '/search',
    templateUrl: 'js/main/templates/search.tpl.html',
    controller: 'SearchCtrl'
  })
  .state('app.signup', {
    url: '/signup',
    templateUrl: 'js/main/templates/signup.tpl.html',
    controller: 'SignUpCtrl'
  })
  .state('app.signin', {
    url: '/signin',
    templateUrl: 'js/main/templates/signin.tpl.html',
    controller: 'SignInCtrl'
  })
  .state('app.profile', {
    url: '/profile',
    templateUrl: 'js/main/templates/profile.tpl.html',
    controller: 'ProfileCtrl'
  })
  .state('app.listing', {
    url: '/:listing_id',
    templateUrl: 'js/main/templates/listing.tpl.html',
    controller: 'ListingCtrl'
  })

}]);