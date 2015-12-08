var restify       = require('restify');
var serverConfig  = require('./config/secrets').server;
var server        = restify.createServer(serverConfig);
var fs = require('fs');

// Restify Config
// server.use(restify.acceptParser(server.acceptable));
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
server.get(/\/?.(js|css|html|jpg|png)/, restify.serveStatic({
  directory: __dirname + '/public',
  // default: 'index.html',
  // match: /^((?!app.js).)*$/
}));

// server.get('/', restify.serveStatic({
//   directory: __dirname + '/public',
//   default: 'index.html'
// }));

// Load Routes
require('./routes/routes.js')(server);

server.get(/^\/?.*/, function (req, res, next) {
  var indexHtmlFilePath = __dirname + '/public/index.html';
  fs.readFile(indexHtmlFilePath, function (err, data) {
    if (err) return next(err);
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
    next();
  });
});

// Start Server
server.listen(serverConfig.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});