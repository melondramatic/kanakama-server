const { expect } = require('chai');
const UpdateStats = require('../../utils/UpdateStats');

describe('UpdateStats util tests', () => {
	const initialStats = JSON.stringify([
		{
			hiraganaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
			katakanaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
		},
		{
			hiraganaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
			katakanaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
		},
	]);

	it('updates a hiragana reading stat', () => {
		const user = { stats: initialStats };
		const stats = JSON.stringify([
			{
				index: 0,
				kanaSelection: 'HIRAGANA',
				practiceMode: 'READING',
				isCorrect: true,
			},
		]);

		const updatedStat = JSON.parse(UpdateStats(user, stats))[0];

		expect(updatedStat.hiraganaStat.chooseReadingOccurrences).equals(1);
		expect(updatedStat.hiraganaStat.chooseReadingCorrect).equals(1);
		expect(updatedStat.hiraganaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(updatedStat.katakanaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterCorrect).equals(0);
	});

	it('updates a katakana reading stat', () => {
		const user = { stats: initialStats };
		const stats = JSON.stringify([
			{
				index: 0,
				kanaSelection: 'KATAKANA',
				practiceMode: 'READING',
				isCorrect: true,
			},
		]);

		const updatedStat = JSON.parse(UpdateStats(user, stats))[0];

		expect(updatedStat.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(updatedStat.katakanaStat.chooseReadingOccurrences).equals(1);
		expect(updatedStat.katakanaStat.chooseReadingCorrect).equals(1);
		expect(updatedStat.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterCorrect).equals(0);
	});

	it('updates a katakana character stat', () => {
		const user = { stats: initialStats };
		const stats = JSON.stringify([
			{
				index: 0,
				kanaSelection: 'KATAKANA',
				practiceMode: 'CHARACTER',
				isCorrect: true,
			},
		]);

		const updatedStat = JSON.parse(UpdateStats(user, stats))[0];

		expect(updatedStat.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(updatedStat.katakanaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterOccurrences).equals(1);
		expect(updatedStat.katakanaStat.chooseCharacterCorrect).equals(1);
	});

	it('updates a hiragana character stat when incorrect', () => {
		const user = { stats: initialStats };
		const stats = JSON.stringify([
			{
				index: 0,
				kanaSelection: 'HIRAGANA',
				practiceMode: 'CHARACTER',
				isCorrect: false,
			},
		]);

		const updatedStat = JSON.parse(UpdateStats(user, stats))[0];

		expect(updatedStat.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.hiraganaStat.chooseCharacterOccurrences).equals(1);
		expect(updatedStat.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(updatedStat.katakanaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat.katakanaStat.chooseCharacterCorrect).equals(0);
	});

	it('updates multiple stats', () => {
		const user = { stats: initialStats };
		const stats = JSON.stringify([
			{
				index: 0,
				kanaSelection: 'HIRAGANA',
				practiceMode: 'CHARACTER',
				isCorrect: false,
			},
			{
				index: 1,
				kanaSelection: 'KATAKANA',
				practiceMode: 'READING',
				isCorrect: true,
			},
			{
				index: 0,
				kanaSelection: 'HIRAGANA',
				practiceMode: 'CHARACTER',
				isCorrect: true,
			},
		]);

		const updatedStat1 = JSON.parse(UpdateStats(user, stats))[0];

		expect(updatedStat1.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat1.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat1.hiraganaStat.chooseCharacterOccurrences).equals(2);
		expect(updatedStat1.hiraganaStat.chooseCharacterCorrect).equals(1);

		expect(updatedStat1.katakanaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat1.katakanaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat1.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat1.katakanaStat.chooseCharacterCorrect).equals(0);

		const updatedStat2 = JSON.parse(UpdateStats(user, stats))[1];

		expect(updatedStat2.hiraganaStat.chooseReadingOccurrences).equals(0);
		expect(updatedStat2.hiraganaStat.chooseReadingCorrect).equals(0);
		expect(updatedStat2.hiraganaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat2.hiraganaStat.chooseCharacterCorrect).equals(0);

		expect(updatedStat2.katakanaStat.chooseReadingOccurrences).equals(1);
		expect(updatedStat2.katakanaStat.chooseReadingCorrect).equals(1);
		expect(updatedStat2.katakanaStat.chooseCharacterOccurrences).equals(0);
		expect(updatedStat2.katakanaStat.chooseCharacterCorrect).equals(0);
	});
});
