var fs        = require("fs");
var path      = require("path");
var async     = require('async');
var Sequelize = require("sequelize");
var config    = require(__dirname + '/../config/secrets.js').database.pg;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};


var isModel = function (file) {
  var hasExtension  = file.indexOf(".") !== 0;
  var notIndex      = file !== "index.js";
  return hasExtension && notIndex;
}

var importModel = function (file, cb) {
  var file_path = path.join(__dirname, file);
  var model = sequelize["import"](file_path);
  db[model.name] = model;
  return cb(null);
}

var associateModel = function (model_name, cb) {
  if ("associate" in db[model_name]) {
    db[model_name].associate(db);
  }
  return cb(null);
}

var loadModels = function (cb) {
  async.waterfall([
    function loadModelFiles (cb) {
      return fs.readdir(__dirname, cb);
    },
    function filterModels (files, cb) {
      return cb(null, files.filter(isModel));
    },
    function importModels (models, cb) {
      return async.each(models, importModel, cb);
    },
    function associateModels (cb) {
      return async.each(Object.keys(db), associateModel, cb);
    },
    function syncronizeSequelize (cb) {
      sequelize.sync({force: false})
      .then(function () { cb(null); }).catch(cb);
    }
  ], cb);
}

db.loadModels = loadModels;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;