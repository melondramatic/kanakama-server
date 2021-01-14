const User = require('../models/user.model');

ValidateUsername = async (req, res, next) => {
	let error = false;
	const errorMessages = [];

	User.findOne({
		username: req.body.username,
	}).exec((err, user) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (user) {
			return res
				.status(400)
				.json({ error: [`Username '${req.body.username}' is already in use`] });
		}
		next();
	});
};

module.exports = ValidateUsername;
