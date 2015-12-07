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
require('./models/index').loadModels(function (err) {
	if (err) return console.error(err);
	return console.log("Models Loaded");
});

// Static Files
server.get(/\/?.(js|css|html)/, restify.serveStatic({
  directory: __dirname + '/public',
  default: 'index.html',
  match: /^((?!app.js).)*$/
}));

server.get('/', restify.serveStatic({
  directory: __dirname + '/public',
  default: 'index.html'
}));

// Load Routes
require('./routes/routes.js')(server);

// Start Server
server.listen(serverConfig.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});