var bcrypt = require('bcrypt-nodejs');
var restify	= require('restify');
var async	= require('async');

module.exports = function(sequelize, DataTypes) {
	var State = sequelize.define('State', {
		state_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		country_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Country", key: "country_id" }
		},
		name: DataTypes.STRING
	}, {
		timestamps: false,
		tableName: 'State',
		classMethods: {
			associate: function (models) {
				State.hasMany(models.City, {
					as: 'cities', foreignKey: 'state_id'
				})
				State.belongsTo(models.Country, {
					as: 'country', foreignKey: 'country_id'
				})
			}
		}
	});

	return State;
};