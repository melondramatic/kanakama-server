const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

LoginController = (req, res) => {
	User.findOne({ username: req.body.username }).exec((err, user) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!user) {
			return res
				.status(404)
				.json({ error: [`User '${req.body.username}' not found`] });
		}
		try {
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res
					.status(401)
					.json({ accessToken: null, error: ['Invalid Password'] });
			}
		} catch (err) {
			return res.status(500).json({ message: err });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
		res.status(200).json({
			id: user.id,
			username: user.username,
			accessToken: token,
		});
	});
};

module.exports = LoginController;
