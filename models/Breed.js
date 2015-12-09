var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Breed = sequelize.define('Breed', {
		breed_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		name: DataTypes.STRING,
		lifespan: DataTypes.INTEGER,
		expected_weight: DataTypes.INTEGER,
		shedding: DataTypes.BOOLEAN,
		child_friendly: DataTypes.BOOLEAN
	}, {
		timestamps: false,
		tableName: 'Breeds',
		classMethods: {
			associate: function (models) {
				Breed.hasMany(models.Listing, {
					as: 'listings', foreignKey: 'breed_id'
				})
			}
		}
	});

	return Breed;
};