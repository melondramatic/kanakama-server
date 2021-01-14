const { expect } = require('chai');
const MakeInitialStats = require('../../utils/MakeInitialStats');

describe('MakeInitialStats util tests', () => {
	it('creates an array of 46 stats', () => {
		const stats = JSON.parse(MakeInitialStats());
		expect(stats.length).equals(46);
	});

	it('initializes each stat to 0', () => {
		const stats = JSON.parse(MakeInitialStats());
		const stat = stats[Math.floor(Math.random() * 46)];

		expect(stat.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(stat.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(stat.hiraganaStat.chooseCharacterOccurrences).equals(0);
		expect(stat.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(stat.katakanaStat.chooseReadingOccurrences).equals(0);
		expect(stat.katakanaStat.chooseReadingCorrect).equals(0);
		expect(stat.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(stat.katakanaStat.chooseCharacterCorrect).equals(0);
	});
});
