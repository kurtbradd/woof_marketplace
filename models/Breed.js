var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Breed = sequelize.define('Breed', {
		id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		lifespan: DataTypes.INTEGER,
		expected_weight: DataTypes.INTEGER,
		isShedding: DataTypes.BOOLEAN,
		isChildFriendly: DataTypes.BOOLEAN
	}, {
		tableName: 'Breeds'
	});

	return Breed;
};