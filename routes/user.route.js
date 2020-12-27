const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const ValidateUser = require('../middleware/userValidation');

router.use('/add', [ValidateUser]);
router.route('/add').post((req, res) => {
	console.log('add user');
	const username = req.body.username;
	const password = bcrypt.hashSync(req.body.password, 10);
	const email = req.body.email;

	const newUser = new User({
		username,
		password,
		email,
	});

	newUser
		.save()
		.then(() => {
			res.status(200).end();
		})
		.catch((err) => {
			res.status(500).json({ message: `Error: ${err}` });
		});
});

router.route('/login').post((req, res) => {
	console.log('login user');
	User.findOne({ username: req.body.username }).exec((err, user) => {
		if (err) {
			res.status(500).json({ message: err });
			return;
		}
		if (!user) {
			res
				.status(404)
				.json({ message: `User '${req.body.username}' not found` });
			return;
		}
		try {
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				res
					.status(401)
					.json({ accessToken: null, message: 'Invalid Password' });
				return;
			}
		} catch (err) {
			res.status(500).json({ message: err });
			return;
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
		res.status(200).json({
			id: user.id,
			username: user.username,
			accessToken: token,
		});
	});
});

module.exports = router;
