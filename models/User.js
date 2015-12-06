var PasswordHelper 	= require('../modules/PasswordHelper.js');
var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
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
		tableName: 'Users',
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