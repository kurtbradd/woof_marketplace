var PasswordHelper 	= require('../modules/PasswordHelper.js');
var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT
		},
		f_name: DataTypes.STRING,
		l_name: DataTypes.STRING,
		admin: DataTypes.BOOLEAN,
		age: DataTypes.INTEGER,
		email: {
			index: true,
			allowNull: false,
			type: DataTypes.STRING,
			foreignKey: true,
			unique: true,
		},
		phone: DataTypes.STRING,
		password: DataTypes.STRING,
		description: DataTypes.STRING,
		timestamp: DataTypes.DATE
	}, {
		timestamps: false,
		tableName: 'Users',
		classMethods: {
			associate: function (models) {
				User.hasMany(models.Listing, {
					as: 'listings', foreignKey: 'user_id'
				})
				User.hasMany(models.Request, {
					as: 'requests', foreignKey: 'user_id'
				})
				User.hasMany(models.Token, {
					as: 'tokens', foreignKey: 'user_id'
				})
				User.hasMany(models.Message, {
					as: 'received_messages', foreignKey: 'rcv_user_id'
				})
				User.hasMany(models.Message, {
					as: 'sent_messages', foreignKey: 'snd_user_id'
				})
				User.hasOne(models.Address, {
					as: 'address', foreignKey: 'user_id'
				})
			}
		},
		instanceMethods: {
			toJSON: function () {
				var values = this.get();
				delete values.password;
				delete values.createdAt;
				delete values.updatedAt;
				return values;
			},
			comparePassword: function(password, done) {
				bcrypt.compare(password, this.password, done);
			},
			changePassword: function (oldPassword, newPassword, done) {
				var values = this.get();
				this.comparePassword(oldPassword, function (err, match) {
					if (err) return done(err);
					if (!match) return done(new restify.InvalidCredentialsError('Incorrect Password'))
					values.password = newPassword;
					return done();
				})
			},
			updateField: function (field, value) {
				this.set(field, value);
				return this;
			}
		}
	});

	User.beforeCreate(function (user, options, fn) {
		PasswordHelper.hashPassword(user.password, function (err, hash) {
			if (err) return fn(err);
			user.password = hash;
			return fn(null, user);
		});
	})

	User.beforeUpdate(function (user, options, fn) {
		if (!user.changed("password")) return fn(null, user);
		PasswordHelper.hashPassword(user.password, function (err, hash) {
			if (err) return fn(err);
			user.password = hash;
			return fn(null, user);
		})
	})

	return User;
};