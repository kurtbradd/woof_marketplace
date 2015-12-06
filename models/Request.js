var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Request = sequelize.define('Request', {
		request_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		listing_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Listings", key: "listing_id" }
		},
		status: DataTypes.STRING,
		timestamp: DataTypes.DATE
	}, {
		tableName: 'Requests'
	});

	return Request;
};