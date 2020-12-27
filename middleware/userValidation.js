const User = require('../models/user.model');

ValidateUser = (req, res, next) => {
	console.log('validate user');
	User.findOne({
		username: req.body.username,
	}).exec((err, user) => {
		if (err) {
			res.status(500).json({ message: err });
			return;
		}
		if (user) {
			res
				.status(400)
				.json({ message: `Username '${req.body.username}' is already in use` });
			return;
		}

		User.findOne({
			email: req.body.email,
		}).exec((err, user) => {
			if (err) {
				res.status(500).json({ message: err });
				return;
			}
			if (user) {
				res
					.status(400)
					.json({ message: `Email '${req.body.email}' is already in use` });
				return;
			}
		});
		next();
	});
};

module.exports = ValidateUser;
