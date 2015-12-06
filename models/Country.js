var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var Country = sequelize.define('Country', {
		country_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		code: DataTypes.STRING,
		name: DataTypes.STRING
	}, {
		tableName: 'Country'
	});

	return Country;
};