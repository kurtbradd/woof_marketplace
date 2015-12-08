var bcrypt = require('bcrypt-nodejs');
var restify = require('restify');
var async = require('async');

module.exports = function(sequelize, DataTypes) {
	var Review = sequelize.define('Review', {
		review_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
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
		content: DataTypes.STRING,
		timestamp: DataTypes.DATE
	}, {
		timestamps: false,
		tableName: 'Reviews'
	});

	return Review;
};