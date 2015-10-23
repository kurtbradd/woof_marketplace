var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Listing = sequelize.define('Listing', {
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
    breed_id: {
			allowNull: false,
      type: DataTypes.BIGINT,
      references: { model: "Breeds", key: "id" }
		},
		visible: DataTypes.BOOLEAN,
		name: DataTypes.STRING,
		cost: DataTypes.INTEGER,
		deposit: DataTypes.INTEGER,
		current_age: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		tableName: 'Listings'
	});

	return Listing;
};