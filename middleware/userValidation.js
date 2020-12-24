const { validate } = require('../models/user.model');
const User = require('../models/user.model');

ValidateUser = (req, res, next) => {
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
