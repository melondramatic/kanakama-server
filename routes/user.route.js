const router = require('express').Router();

const AddController = require('../controllers/addUser.controller');
const LoginController = require('../controllers/loginUser.controller');
const {
	GetStatsController,
	UpdateStatsController,
} = require('../controllers/stats.controller');
const ValidateUsername = require('../middleware/usernameValidation');
const AuthenticateUser = require('../middleware/userAuthentication');

router.use('/add', [ValidateUsername]);
router.route('/add').post((req, res) => AddController(req, res));

router.route('/login').post((req, res) => LoginController(req, res));

router.use('/stats', [AuthenticateUser]);
router.route('/stats').post((req, res) => GetStatsController(req, res));
router
	.route('/stats/update')
	.post((req, res) => UpdateStatsController(req, res));

module.exports = router;
