var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define('Message', {
		id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		sender_user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "id" }
		},
		reciever_user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "id" }
		},
		text: DataTypes.STRING
	}, {
		tableName: 'Messages'
	});

	return Message;
};