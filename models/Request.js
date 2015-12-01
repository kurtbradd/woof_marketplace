var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Request = sequelize.define('Request', {
		id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "id" }
		},
		listing_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Listings", key: "id" }
		}
	}, {
		tableName: 'Requests'
	});

	return Request;
};