var bcrypt = require('bcrypt-nodejs');
var restify = require('restify');
var async = require('async');

module.exports = function(sequelize, DataTypes) {
	var Purchase = sequelize.define('Purchase', {
		purchase_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		request_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Requests", key: "request_id" }
		},
		status: DataTypes.STRING,
		timestamp: DataTypes.DATE,
		commission: DataTypes.FLOAT
	}, {
		timestamps: false,
		tableName: 'Purchases'
	});

	return Purchase;
};