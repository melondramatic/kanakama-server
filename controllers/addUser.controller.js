const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const MakeInitialStats = require('../utils/MakeInitialStats');

AddController = (req, res) => {
	const username = req.body.username;
	const password = bcrypt.hashSync(req.body.password, 10);
	const email = req.body.email;
	const stats = req.body.stats || MakeInitialStats();

	const newUser = new User({
		username,
		password,
		stats,
	});

	if (req.body.email !== '') {
		newUser.email = email;
	}

	newUser
		.save()
		.then(() => {
			res.status(200).end();
		})
		.catch((err) => {
			return res.status(500).json({ message: `Error: ${err}` });
		});
};

module.exports = AddController;
