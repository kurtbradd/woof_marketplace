var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var Listing = sequelize.define('Listing', {
		listing_id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		breed_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Breeds", key: "breed_id" }
		},
		visible: DataTypes.BOOLEAN,
		available: DataTypes.BOOLEAN,
		name: DataTypes.STRING,
		age: DataTypes.INTEGER,
		cost: DataTypes.FLOAT,
		deposit: DataTypes.FLOAT,
		description: DataTypes.STRING,
		timestamp: DataTypes.DATE
	}, {
		tableName: 'Listings'
	});

	return Listing;
};