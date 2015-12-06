var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var ListingImage = sequelize.define('ListingImage', {
		image_id: {
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
		filepath: DataTypes.STRING
	}, {
		tableName: 'ListingImages'
	});

	return ListingImage;
};