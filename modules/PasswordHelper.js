var bcrypt = require('bcrypt-nodejs');

exports.hashPassword = function (password, cb) {
	bcrypt.genSalt(5, function(err, salt) {
		if (err) return cb(err);
		bcrypt.hash(password, salt, null, function(err, hash) {
			if (err) return cb(err);
			cb(null, hash)
		});
	});
}