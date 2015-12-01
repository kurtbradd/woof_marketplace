var restify     = require('restify');
var UserCtrl    = require('./controllers/UserCtrl');
var SessionCtrl = require('./controllers/SessionCtrl');
var ListingCtrl = require('./controllers/ListingCtrl');
var TokenManager = require('../modules/TokenManager.js');

module.exports = function (server) {


  server.use(function (req, res, next) {
    if (req.url == '/session/register') return next();
    if (req.url == '/session/login') return next();
    TokenManager.verifyToken(req, res, next);
  })

  // SESSIONS
  var sessionsEndpoint = '/session';
  server.post(sessionsEndpoint + '/register', SessionCtrl.register);
  server.post(sessionsEndpoint + '/login', SessionCtrl.login);
  server.get (sessionsEndpoint + '/logout', SessionCtrl.logout);
  server.del (sessionsEndpoint + '/cancel', SessionCtrl.cancel);

  // USER
  var userEndpoint = '/user';
  server.get (userEndpoint + '/', UserCtrl.getMyUserProfile);
  server.get (userEndpoint + '/:user_id', UserCtrl.getUserProfile);
  server.post(userEndpoint + '/profilepic', UserCtrl.updateUserProfilePicture);
  server.post(userEndpoint + '/password', UserCtrl.updateUserPassword);
  server.post(userEndpoint + '/profile', UserCtrl.updateUserProfile);

  // LISTING
  var listingEndpoint = '/listing';
  server.get (listingEndpoint + '/', ListingCtrl.getListings);
  server.post(listingEndpoint + '/',ListingCtrl.createListing);
  server.get (listingEndpoint + '/:listing_id',ListingCtrl.getListing);
  server.post(listingEndpoint + '/:listing_id',ListingCtrl.updateListing);
  server.del (listingEndpoint + '/:listing_id',ListingCtrl.deleteListing);

  // REVIEW
  var reviewEndpoint = '/review';

  // TRANSACTION
  var transaction = '/'
  
  // TEST ROUTE
  server.get('/echo/:name', function (req, res, next) {
    return res.send(req.params);
  });
  
  console.log('Routes loaded');
}