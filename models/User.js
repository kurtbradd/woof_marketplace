var bcrypt 					= require('bcrypt-nodejs');
var restify  				= require('restify');
var async   				= require('async');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: {
			unique: true,
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		f_name: DataTypes.STRING,
		l_name: DataTypes.STRING,
		age: DataTypes.INTEGER,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		password: DataTypes.STRING,
		description: DataTypes.STRING,
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
				bcrypt.compare(password, this.password, function(err, isMatch) {
					if (done && err) return done(err);
					if (done) return done(null, isMatch);
				});
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

	return User;
};