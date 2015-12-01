var db                = require('../models/index.js');
var jwt               = require('jsonwebtoken');
var restify           = require('restify');
var sessionConfig     = require(__dirname + '/../config/secrets.js').sessions;
var sessionSecret     = sessionConfig.secret;
var sessionExpiration = sessionConfig.expiration;

exports.createToken = function (userId, cb) {
  var token = jwt.sign({id: userId}, sessionSecret, {expiresIn: sessionExpiration});

  db.Token.create({ user_id: userId, token: token }).then(function (jwt) {
    if (!jwt) return cb(new restify.InternalError("Could Not Store Token"));
    if (jwt) return cb(null, jwt.token);
  }).catch(cb);
}

exports.verifyToken = function (req, res, next) {
  var token = req.authorization.credentials;

  jwt.verify(token, sessionSecret, function (err, decoded) {
    if (err) return res.send(401, {error:err});

    req.user = decoded.id;
    var queryParams = { where: { user_id: req.user, token: token }};

    db.Token.findOne(queryParams).then(function (foundToken) {
      if (foundToken) return next();
      return next(new restify.InvalidCredentialsError("Invalid Token"));
    }).catch(next);
  });
}

exports.expireToken = function(userId, token, cb) {
  var queryParams = { where: { user_id: userId, token: token }};
  db.Token.destroy(queryParams)
  .then(function () { return cb(); }).catch(cb);
}