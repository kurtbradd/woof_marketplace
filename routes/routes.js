var restify = require('restify');
var UserCtrl = require('./controllers/UserCtrl');
var SessionCtrl = require('./controllers/SessionCtrl');
var ListingCtrl = require('./controllers/ListingCtrl');

module.exports = function (server) {

  // TEST ECHO ROUTE
  server.get('/echo/:name', function (req, res, next) {
    return res.send(req.params);
  });

  // SESSIONS
  var sessionsEndpoint = '/session';
  server.post(sessionsEndpoint + '/register', SessionCtrl.register);
  server.post(sessionsEndpoint + '/login', SessionCtrl.login);
  server.get (sessionsEndpoint + '/logout', SessionCtrl.logout);

  // USER
  var userEndpoint = '/user';
  server.get (userEndpoint + '/profile', UserCtrl.getMyUserProfile);
  server.get (userEndpoint + '/profile/:id', UserCtrl.getUserProfile);
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
  
  console.log('Routes loaded');
}