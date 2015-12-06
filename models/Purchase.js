var bcrypt = require('bcrypt-nodejs');
var restify = require('restify');
var async = require('async');

module.exports = function(sequelize, DataTypes) {
	var Purchase = sequelize.define('Purchase', {
		purchase_id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		request_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Requests", key: "request_id" }
		},
		status: DataTypes.STRING,
		timestamp: DataTypes.DATE,
		commission: DataTypes.FLOAT,
	}, {
		tableName: 'Purchases'
	});

	return Purchase;
};