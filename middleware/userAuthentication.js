const jwt = require('jsonwebtoken');

AuthenticateUser = (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(403).json({ message: 'Could not authenticate user' });
	}

	jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	});
};

module.exports = AuthenticateUser;
