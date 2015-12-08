var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var City = sequelize.define('City', {
		city_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		state_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "State", key: "state_id" }
		},
		name: DataTypes.STRING
	}, {
		timestamps: false,
		tableName: 'City'
	});

	return City;
};