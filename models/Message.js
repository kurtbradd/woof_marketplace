var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define('Message', {
		message_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		snd_user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		rcv_user_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		content: DataTypes.STRING,
		timestamp: DataTypes.DATE
	}, {
		timestamps: false,
		tableName: 'Messages',
		classMethods: {
			associate: function (models) {
				Message.belongsTo(models.User, {
					as: 'sender', foreignKey: 'snd_user_id'
				})
				Message.belongsTo(models.User, {
					as: 'receiver', foreignKey: 'rcv_user_id'
				})
			}
		}
	});

	return Message;
};