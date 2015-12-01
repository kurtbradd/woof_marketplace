var async = require('async');
var Faker = require('faker');

// cb(accessToken)
exports.userLoginWithInfo = function (info, cb) {
	api.post('/sessions/login')
	.send({email: info.email, password: info.password})
  .end(function(err, res) {
    return cb(res.body.token);
  });
}

var registerUserWithInfo = function (info, cb) {
	api.post('/sessions/register').send(info)
  .end(function(err, res) {
    return cb(null, res.body);
  });
}
exports.registerUserWithInfo = registerUserWithInfo;


var generateUser = function () {
  var username = Faker.internet.userName().toLowerCase();
  return {
    f_name: Faker.name.firstName(),
    l_name: Faker.name.lastName(),
    email: Faker.internet.email(),
    username: username,
    password: username,
    description: Faker.company.companyName()
  }
}


exports.registerUsers = function (numUsers, cb) {
  var users= [];
  for (var i = 0; i < numUsers; i++) { 
    users.push(generateUser());
  };
  var completionHandler = function (err, results) {
    return cb(null, results);
  }
  async.map(users, registerUserWithInfo, completionHandler);
}


exports.deleteUsers = function (users, cb) {
  async.each(users, function(user, callbackDelete) {
    deleteUserWithToken(user.token, callbackDelete);
  }, function (err, results) {
    return cb(null, results);
  })
}


exports.registerTwoUsersWithInfo = function (info, cb) {
  var handler = function (cb) {
    return function (err, body) {
      return cb(err, {token: body.token, info: body.user});
    }
  }
  return async.parallel({
    user1: function (cb) {
      return registerUserWithInfo(info.user1, handler(cb));
    },
    user2: function (cb) {
      return registerUserWithInfo(info.user2, handler(cb));
    }
  },function (err, results) {
    if (err) return cb(err);
    return cb(null, results);
  })
}

var deleteUserWithToken = function (token, done) {
  api.post('/user/delete')
  .set('Authorization', 'Bearer ' + token)
  .expect(204, done);
}
exports.deleteUserWithToken = deleteUserWithToken;


exports.deleteTwoUsersWithTokens = function (tokens, cb) {
  async.parallel({
    user1: function (cb) {
      return deleteUserWithToken(tokens.user1, cb);
    },
    user2: function (cb) {
      return deleteUserWithToken(tokens.user2, cb);
    }
  },function (err, results) {
    if (err) return cb(err);
    return cb();
  })
}

exports.userLogoutWithToken = function (token, cb) {
	api.get('/sessions/logout')
	.set('Authorization', 'Bearer ' + token)
  .end(cb);
}

exports.handleError = function (res, done) {
	return done(new Error(JSON.stringify(res.body)));
}

exports.verifyUserAndToken = function (res) {
	res.body.should.have.property('user').and.be.a('object');
  res.body.should.have.property('token').and.be.a('string');
  verifyReturnedUser(res);
}

exports.registerInfo1 = {
	f_name: "Kurt",
	l_name: "DaCosta",
	email: "kurtbradd@gmail.com",
	username: "kurtbradd",
	password: "password",
	description: "FANCY"
}

exports.registerInfo2 = {
  f_name: "David",
  l_name: "Elsonbaty",
  email: "davidels@me.com",
  username: "davidels",
  password: "password",
  description: "FANCY"
}

exports.verifyReturnedUser = verifyReturnedUser = function (res) {
	// res.body['user'].should.have.property('user_id').and.be.a('string');
  res.body['user'].should.have.property('f_name').and.be.a('string');
  res.body['user'].should.have.property('l_name').and.be.a('string');
  res.body['user'].should.have.property('email').and.be.a('string');
  res.body['user'].should.have.property('username').and.be.a('string');
  res.body['user'].should.have.property('description').and.be.a('string');
  res.body['user'].should.not.have.property('password').and.be.a('string');
}