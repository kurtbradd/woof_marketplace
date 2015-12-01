var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require(__dirname + '/../config/secrets.js').database.pg;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};


var isModel = function (file) {
	var hasExtension 	= file.indexOf(".") !== 0;
	var notIndex 			= file !== "index.js";
	return hasExtension && notIndex;
}

var importModel = function (file) {
	var file_path = path.join(__dirname, file);
	var model = sequelize["import"](file_path);
	db[model.name] = model;
}

var associateModel = function (model_name) {
	if ("associate" in db[model_name]) {
		db[model_name].associate(db);
	}
}

var successHandler = function () {
	console.log("Models Loaded");
}


db.loadModels = function (cb) {
	// Load & Import Data Models from definitions
	fs.readdirSync(__dirname).filter(isModel).forEach(importModel);

	// Associate Data Models with Sequelize Models
	Object.keys(db).forEach(associateModel);

	// Syncronize Database with Sequelize Models
	sequelize.sync( { force: true } )
	.then(function () { cb(null); })
	.catch(cb);

}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;