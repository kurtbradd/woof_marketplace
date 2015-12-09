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
		timestamps: false,
		tableName: 'Requests',
		classMethods: {
			associate: function (models) {
				Request.belongsTo(models.User, {
					as: 'user', foreignKey: 'user_id'
				})
				Request.belongsTo(models.Listing, {
					as: 'listing', foreignKey: 'listing_id'
				})
				Request.hasOne(models.Purchase, {
					as: 'purchase', foreignKey: 'request_id'
				})
			}
		}
	});

	return Request;
};