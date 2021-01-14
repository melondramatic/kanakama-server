const { expect } = require('chai');
const sinon = require('sinon');

const ValidateUsername = require('../../middleware/usernameValidation');
const User = require('../../models/user.model');

describe('usernameValidation tests', () => {
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

	it('returns a 400 when a username is already in use', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, {});
			},
		});

		req = {
			body: {
				username: 'test',
			},
		};
		ValidateUsername(req, mockResponse(), next);
		expect(statusStub.calledWith(400)).equals(true);
		expect(next.calledOnce).equals(false);
	});

	it('calls next if the username is unused', () => {
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
		ValidateUsername(req, mockResponse(), next);
		expect(next.calledOnce).equals(true);
	});
});
