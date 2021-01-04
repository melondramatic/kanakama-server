UpdateStats = (user, stats) => {
	const currentStats = JSON.parse(user.stats);
	const statsToUpdate = JSON.parse(stats);

	statsToUpdate.forEach((stat) => {
		const oldStat = currentStats[stat.index];

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
							practiceMode === 'READING' && stat.isCorrect
								? oldHiraganaStat.chooseReadingCorrect + 1
								: oldHiraganaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === 'CHARACTER'
								? oldHiraganaStat.chooseCharacterOcurrences + 1
								: oldHiraganaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === 'CHARACTER' && stat.isCorrect
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
							practiceMode === 'READING' && stat.isCorrect
								? oldKatakanaStat.chooseReadingCorrect + 1
								: oldKatakanaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === 'CHARACTER'
								? oldKatakanaStat.chooseCharacterOcurrences + 1
								: oldKatakanaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === 'CHARACTER' && stat.isCorrect
								? oldKatakanaStat.chooseCharacterCorrect + 1
								: oldKatakanaStat.chooseCharacterCorrect,
				  }
				: oldKatakanaStat;

		const newStat = {
			hiraganaStat,
			katakanaStat,
		};

		currentStats[stat.index] = newStat;
	});

	return JSON.stringify(currentStats);
};

module.exports = UpdateStats;
