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
						chooseReadingOccurrences:
							practiceMode === 'READING'
								? oldHiraganaStat.chooseReadingOccurrences + 1
								: oldHiraganaStat.chooseReadingOccurrences,
						chooseReadingCorrect:
							practiceMode === 'READING' && isCorrect
								? oldHiraganaStat.chooseReadingCorrect + 1
								: oldHiraganaStat.chooseReadingCorrect,
						chooseCharacterOccurrences:
							practiceMode === 'CHARACTER'
								? oldHiraganaStat.chooseCharacterOccurrences + 1
								: oldHiraganaStat.chooseCharacterOccurrences,
						chooseCharacterCorrect:
							practiceMode === 'CHARACTER' && isCorrect
								? oldHiraganaStat.chooseCharacterCorrect + 1
								: oldHiraganaStat.chooseCharacterCorrect,
				  }
				: oldHiraganaStat;

		const katakanaStat =
			kanaSelection === 'KATAKANA'
				? {
						chooseReadingOccurrences:
							practiceMode === 'READING'
								? oldKatakanaStat.chooseReadingOccurrences + 1
								: oldKatakanaStat.chooseReadingOccurrences,
						chooseReadingCorrect:
							practiceMode === 'READING' && isCorrect
								? oldKatakanaStat.chooseReadingCorrect + 1
								: oldKatakanaStat.chooseReadingCorrect,
						chooseCharacterOccurrences:
							practiceMode === 'CHARACTER'
								? oldKatakanaStat.chooseCharacterOccurrences + 1
								: oldKatakanaStat.chooseCharacterOccurrences,
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
