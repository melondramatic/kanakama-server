const sinon = require('sinon');
const { expect } = require('chai');
const mongoose = require('mongoose');

const AddController = require('../../controllers/addUser.controller');

describe('addUser controller tests', () => {
	let req;
	let statusStub, jsonStub;

	let modelStub;
	before(() => {
		modelStub = sinon.stub(mongoose.Model.prototype, 'save');
	});

	after(() => {
		sinon.restore();
	});

	beforeEach(() => {
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

	it('saves a user', () => {
		modelStub.returns(Promise.resolve('ok'));

		req = {
			body: {
				username: 'testUser',
				password: 'testPassword',
				email: 'testEmail',
				stats: 'testStats',
			},
		};

		AddController(req, mockResponse());
		expect(modelStub.calledOnce).equals(true);
	});

	it('saves a user with no email provided', () => {
		modelStub.returns(Promise.resolve('ok'));

		req = {
			body: {
				username: 'testUser',
				password: 'testPassword',
				email: '',
				stats: 'testStats',
			},
		};

		AddController(req, mockResponse());
		expect(modelStub.calledOnce).equals(true);
	});
});
