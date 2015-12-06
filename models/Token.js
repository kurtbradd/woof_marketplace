module.exports = function(sequelize, DataTypes) {
		var Token = sequelize.define('Token', {
		user_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.BIGINT,
			references: { model: "Users", key: "user_id" }
		},
		token: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.STRING
		}
	},{
		tableName: 'Tokens',
	});
	return Token;
};