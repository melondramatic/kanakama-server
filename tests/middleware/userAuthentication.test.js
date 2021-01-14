const { expect } = require('chai');
const sinon = require('sinon');

const jwt = require('jsonwebtoken');
const AuthenticateUser = require('../../middleware/userAuthentication');

describe('userAuthentication tests', () => {
	let req, next;
	let statusStub, jsonStub;

	beforeEach(() => {
		next = sinon.spy();
		statusStub = sinon.stub();
		jsonStub = sinon.stub();
	});

	const mockResponse = () => {
		const res = {};
		res.status = statusStub.returns(res);
		res.json = jsonStub.returns(res);
		return res;
	};

	it('returns a 403 when there is no x-access-token header', async () => {
		req = {
			headers: {},
		};

		AuthenticateUser(req, mockResponse(), next);

		expect(statusStub.calledWith(403)).equals(true);
		expect(next.calledOnce).equals(false);
	});

	it('returns a 401 when the x-access-token header is invalid', async () => {
		req = {
			headers: { 'x-access-token': 'test' },
		};

		AuthenticateUser(req, mockResponse(), next);

		expect(statusStub.calledWith(401)).equals(true);
		expect(next.calledOnce).equals(false);
	});

	it('calls next when the token is valid', () => {
		sinon.stub(jwt, 'verify');

		req = {
			headers: {
				'x-access-token': 'goodToken',
			},
		};

		AuthenticateUser(req, mockResponse(), next);

		expect(next.calledOnce).equals(true);
	});
});
