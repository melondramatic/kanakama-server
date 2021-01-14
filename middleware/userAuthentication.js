const jwt = require('jsonwebtoken');

AuthenticateUser = (req, res, next) => {
	let token = req.headers['x-access-token'];
	let error = false;

	if (!token) {
		error = true;
		return res.status(403).json({ error: ['Could not authenticate user'] });
	}

	jwt.verify(token, process.env.JWT_KEY, (err) => {
		if (err) {
			error = true;
			return res.status(401).json({ error: ['Unauthorized'] });
		}
	});

	if (!error) next();
};

module.exports = AuthenticateUser;
