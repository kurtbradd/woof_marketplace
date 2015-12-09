var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var Listing = sequelize.define('Listing', {
		listing_id: {
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
		timestamps: false,
		tableName: 'Listings',
		classMethods: {
			associate: function (models) {
				Listing.hasMany(models.ListingImage, {
					as: 'images', foreignKey: 'listing_id'
				})
				Listing.hasMany(models.Request, {
					as: 'requests', foreignKey: 'user_id'
				})
				Listing.hasMany(models.Review, {
					as: 'reviews', foreignKey: 'listing_id'
				})
				Listing.belongsTo(models.Breed, {
					as: 'breed', foreignKey: 'breed_id'
				})
				Listing.belongsTo(models.User, {
					as: 'breeder', foreignKey: 'user_id'
				})
			}
		}
	});
	return Listing;
};