const User = require('../models/user.model');
const UpdateStats = require('../utils/UpdateStats');

GetStatsController = (req, res) => {
	User.findOne({
		username: req.body.username,
	}).exec((err, user) => {
		if (err) {
			res.status(500).json({ message: err });
		}
		if (!user) {
			res
				.status(404)
				.json({ message: `User '${req.body.username}' not found` });
		}

		res.status(200).json({
			stats: user.stats,
		});
	});
};

UpdateStatsController = (req, res) => {
	User.findOne({
		username: req.body.username,
	}).exec((err, user) => {
		if (err) {
			res.status(500).json({ message: err });
		}
		if (!user) {
			res
				.status(404)
				.json({ message: `User '${req.body.username}' not found` });
		}

		user.stats = UpdateStats(user, req.body.stats);
		user
			.save()
			.then(() => {
				res.status(200).end();
			})
			.catch((err) => {
				res.status(500).json({ message: `Error: ${err}` });
			});
	});
};

module.exports = { GetStatsController, UpdateStatsController };
