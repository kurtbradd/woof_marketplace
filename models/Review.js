var bcrypt = require('bcrypt-nodejs');
var restify = require('restify');
var async = require('async');

module.exports = function(sequelize, DataTypes) {
	var Review = sequelize.define('Review', {
		review_id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		listing_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Listings", key: "listing_id" }
		},
		user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		timestamp: DataTypes.DATE
	}, {
		tableName: 'Reviews'
	});

	return Review;
};