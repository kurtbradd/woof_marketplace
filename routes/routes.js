var restify = require('restify');
var UserCtrl = require('./controllers/UserCtrl');
var SessionsCtrl = require('./controllers/SessionsCtrl');

module.exports = function (server) {

  // TEST ECHO ROUTE
  server.get('/echo/:name', function (req, res, next) {
    return res.send(req.params);
  });

  // SESSIONS
  var sessionsEndpoint = '/sessions';
  server.post(sessionsEndpoint + '/register', SessionsCtrl.register);
  server.post(sessionsEndpoint + '/login', SessionsCtrl.login);
  server.get (sessionsEndpoint + '/logout', SessionsCtrl.logout);

  // USER
  var userEndpoint = '/user';
  server.get (userEndpoint + '/profile', UserCtrl.getMyUserProfile);
  server.get (userEndpoint + '/profile/:id', UserCtrl.getUserProfile);
  server.post(userEndpoint + '/profilepic', UserCtrl.updateUserProfilePicture);
  server.post(userEndpoint + '/password', UserCtrl.updateUserPassword);
  server.post(userEndpoint + '/profile', UserCtrl.updateUserProfile);

  console.log('Routes loaded');
}