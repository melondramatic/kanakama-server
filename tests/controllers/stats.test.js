const sinon = require('sinon');
const { expect } = require('chai');

const User = require('../../models/user.model');
const {
	GetStatsController,
	UpdateStatsController,
} = require('../../controllers/stats.controller');

describe('stats controller tests', () => {
	let req, next;
	let statusStub, jsonStub;

	let modelStub;
	before(() => {
		modelStub = sinon.stub(User, 'findOne');
	});

	after(() => {
		sinon.restore();
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

	describe('getStats controller tests', () => {
		it('returns the user stats', () => {
			modelStub.returns({
				exec: (callback) => {
					callback(null, { stats: 'userStats' });
				},
			});

			req = {
				body: {
					username: 'test',
				},
			};

			GetStatsController(req, mockResponse());
			expect(statusStub.calledWith(200)).equals(true);
			expect(jsonStub.calledWith({ stats: 'userStats' }));
		});
	});

	describe('updateStats controller tests', () => {
		it('updates the user stats', () => {
			const saveStub = sinon.stub().returns(Promise.resolve('ok'));
			modelStub.returns({
				exec: (callback) => {
					callback(null, {
						stats: '[]',
						save: saveStub,
					});
				},
			});

			req = {
				body: {
					username: 'test',
					stats: '[]',
				},
			};

			UpdateStatsController(req, mockResponse());
			expect(saveStub.calledOnce).equals(true);
		});
	});
});
