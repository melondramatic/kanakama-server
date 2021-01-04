UpdateStats = (user, stats) => {
	const currentStats = JSON.parse(user.stats);
	const statsToUpdate = JSON.parse(stats);

	statsToUpdate.forEach((stat) => {
		const { index, kanaSelection, practiceMode, isCorrect } = stat;

		const oldStat = currentStats[index];

		const oldHiraganaStat = oldStat.hiraganaStat;
		const oldKatakanaStat = oldStat.katakanaStat;
		const hiraganaStat =
			kanaSelection === 'HIRAGANA'
				? {
						chooseReadingOcurrences:
							practiceMode === 'READING'
								? oldHiraganaStat.chooseReadingOcurrences + 1
								: oldHiraganaStat.chooseReadingOcurrences,
						chooseReadingCorrect:
							practiceMode === 'READING' && isCorrect
								? oldHiraganaStat.chooseReadingCorrect + 1
								: oldHiraganaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === 'CHARACTER'
								? oldHiraganaStat.chooseCharacterOcurrences + 1
								: oldHiraganaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === 'CHARACTER' && isCorrect
								? oldHiraganaStat.chooseCharacterCorrect + 1
								: oldHiraganaStat.chooseCharacterCorrect,
				  }
				: oldHiraganaStat;

		const katakanaStat =
			kanaSelection === 'KATAKANA'
				? {
						chooseReadingOcurrences:
							practiceMode === 'READING'
								? oldKatakanaStat.chooseReadingOcurrences + 1
								: oldKatakanaStat.chooseReadingOcurrences,
						chooseReadingCorrect:
							practiceMode === 'READING' && isCorrect
								? oldKatakanaStat.chooseReadingCorrect + 1
								: oldKatakanaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === 'CHARACTER'
								? oldKatakanaStat.chooseCharacterOcurrences + 1
								: oldKatakanaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === 'CHARACTER' && isCorrect
								? oldKatakanaStat.chooseCharacterCorrect + 1
								: oldKatakanaStat.chooseCharacterCorrect,
				  }
				: oldKatakanaStat;

		const newStat = {
			hiraganaStat,
			katakanaStat,
		};

		currentStats[index] = newStat;
	});

	return JSON.stringify(currentStats);
};

module.exports = UpdateStats;
