var restify       = require('restify');
var serverConfig  = require('./config/secrets').server;
var server        = restify.createServer(serverConfig);

// Restify Config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());

var errorHandler = function (req, res, route, error) {
  if (error) {
  	console.log("SERVER ERROR");
  	console.error(error);
  }
}

// Server Error Handling
server.on('after', errorHandler);
server.on('uncaughtException', errorHandler);

// Load Database Models
require('./models/index');

// Load Routes
require('./routes/routes.js')(server);

// Start Server
server.listen(serverConfig.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});