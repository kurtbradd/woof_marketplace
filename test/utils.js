var async = require('async');
var Faker = require('faker');
var db    = require('../models/index');

////////////////////////////////////////
// DATABASE
////////////////////////////////////////
var wipeDatabase = function (cb) {
  db.loadModels(cb);
}
exports.wipeDatabase = wipeDatabase;

////////////////////////////////////////
// USER
////////////////////////////////////////
var generateUser = function () {
  return {
    f_name: Faker.name.firstName(),
    l_name: Faker.name.lastName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
    age: Faker.random.number(),
    phone: Fake.phone.phoneNumber(),
    description: Faker.name.jobType()
  }
}

////////////////////////////////////////
// SESSION
////////////////////////////////////////
var loginWithInfo = function (info, cb) {
  api.post('/session/login').send(info)
  .end(function(err, res) {
    return cb(err, res.body.token);
  });
}

var logoutWithToken = function (token, cb) {
	api.get('/sessions/logout')
	.set('Authorization', 'Bearer ' + token)
  .end(cb);
}

var registerWithInfo = function (info, cb) {
  api.post('/session/register').send(info)
  .end(function(err, res) {
    return cb(err, res.body);
  });
}


exports.verifyUserAndToken = function (res) {
	res.body.should.have.property('user').and.be.a('object');
  res.body.should.have.property('token').and.be.a('string');
  verifyReturnedUser(res);
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