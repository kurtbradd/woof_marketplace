var sessionConfig     = require(__dirname + '/../config/secrets.js').sessions;
var sessionSecret     = sessionConfig.secret;
var sessionExpiration = sessionConfig.expiration;
var jwt               = require('jsonwebtoken');

exports.createToken = function (userId, cb) {
  var token = jwt.sign({id: userId}, sessionSecret, {expiresInMinutes:sessionExpiration});
  // storetoken for user
}

exports.verifyToken = function (req, res, next) {
  var token = req.authorization.credentials;

  jwt.verify(token, sessionSecret, function(err, decoded) {
    if (err) return res.send(401, {error:err}); //invalid token
    // after verifying token, check for token in DB,
    // checking if it has expired,
    // if not expired, return the user_id as req.user, then call next();
  });
}

exports.expireToken = function(userId, token, cb) {
  // delete token from database
}

exports.deleteTokensForUser = function(userId, cb) {
  // delete all tokens for user from db
}

var storeUserToken = function (userId, token, cb) {
  // store new token for user
}