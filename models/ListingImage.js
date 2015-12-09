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
		timestamps: false,
		tableName: 'ListingImages',
		classMethods: {
			associate: function (models) {
				ListingImage.belongsTo(models.Listing, {
					as: 'listing', foreignKey: 'listing_id'
				})
			}
		}
	});

	return ListingImage;
};