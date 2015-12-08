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
		city_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "City", key: "city_id" }
		},
		street_name: DataTypes.STRING,
		street_number: DataTypes.STRING
	}, {
		timestamps: false,
		tableName: 'Addresses'
	});

	return Address;
};