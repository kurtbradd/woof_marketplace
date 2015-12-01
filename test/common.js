var server 		= require('../config/secrets.js').server;

// Global Packages
global.chai 	= require('chai');
global.should = global.chai.should();
global.assert = global.chai.assert;
global.utils 	= require('./utils.js');
global.api		= require('supertest')(server.url);