const User = require('../models/user.model');

ValidateEmail = async (req, res, next) => {
	if (req.body.email === '') {
		next();
	} else {
		User.findOne({
			email: req.body.email,
		}).exec((err, user) => {
			if (err) {
				return res.status(500).json({ message: err });
			}

			if (user) {
				return res
					.status(400)
					.json({ error: [`Email '${req.body.email}' is already in use`] });
			}

			next();
		});
	}
};

module.exports = ValidateEmail;
