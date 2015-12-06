var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var Address = sequelize.define('Address', {
		user_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		street_name: DataTypes.STRING,
		street_number: DataTypes.STRING,
		zipcode: DataTypes.STRING
	}, {
		tableName: 'Addresses'
	});

	return Address;
};