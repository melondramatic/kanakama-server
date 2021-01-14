const { expect } = require('chai');
const sinon = require('sinon');

const ValidateEmail = require('../../middleware/emailValidation');
const User = require('../../models/user.model');

describe('emailValidation tests', () => {
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

	it('returns a 400 when an email is already in use', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, {});
			},
		});

		req = {
			body: {
				email: 'test',
			},
		};

		ValidateEmail(req, mockResponse(), next);

		expect(statusStub.calledWith(400)).equals(true);
		expect(next.calledOnce).equals(false);
	});

	it('calls next if the email is unused', () => {
		modelStub.returns({
			exec: (callback) => {
				callback(null, null);
			},
		});

		req = {
			body: {
				email: 'test',
			},
		};

		ValidateEmail(req, mockResponse(), next);

		expect(next.calledOnce).equals(true);
	});

	it('calls next if the email is not provided', () => {
		req = {
			body: {
				email: '',
			},
		};

		ValidateEmail(req, mockResponse(), next);

		expect(next.calledOnce).equals(true);
	});
});
