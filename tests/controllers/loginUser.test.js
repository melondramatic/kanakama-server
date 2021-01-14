const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const LoginController = require('../../controllers/loginUser.controller');
const User = require('../../models/user.model');

describe('loginUser controller tests', () => {
	let req, next;
	let statusStub, jsonStub;

	let modelStub;
	before(() => {
		modelStub = sinon.stub(User, 'findOne');
	});

	after(() => {
		modelStub.restore();
	});

	beforeEach(() => {
		next = sinon.spy();
		statusStub = sinon.stub();
		jsonStub = sinon.stub();
	});

	afterEach(() => {
		sinon.reset();
	});

	const mockResponse = () => {
		const res = {};
		res.status = statusStub.returns(res);
		res.json = jsonStub.returns(res);
		return res;
	};

	it('returns an error if the user is not found', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, null);
			},
		});

		req = {
			body: {
				username: 'test',
			},
		};

		LoginController(req, mockResponse());
		expect(statusStub.calledWith(404)).equals(true);
		expect(
			jsonStub.calledWith({ error: [`User '${req.body.username}' not found`] })
		);
	});

	it('returns an error if the password is invalid', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, {
					password: 'foo',
				});
			},
		});

		req = {
			body: {
				username: 'test',
				password: 'bar',
			},
		};

		LoginController(req, mockResponse());
		expect(statusStub.calledWith(401)).equals(true);
	});

	it('returns a token if the username/password are valid', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, {
					password: bcrypt.hashSync('foo', 1),
				});
			},
		});

		jwtStub = sinon.stub(jwt, 'sign').returns('token');

		req = {
			body: {
				username: 'test',
				password: 'foo',
			},
		};

		LoginController(req, mockResponse());
		expect(statusStub.calledWith(200)).equals(true);
	});
});
