UpdateStats = (user, stats) => {
	const currentStats = JSON.parse(user.stats);
	const statsToUpdate = JSON.parse(stats);

	statsToUpdate.forEach((stat) => {
		const oldStat = currentStats[stat.index];

		const oldHiraganaStat = oldStat.hiraganaStat;
		const oldKatakanaStat = oldStat.katakanaStat;
		const hiraganaStat =
			kanaSelection === KanaType.Hiragana
				? {
						chooseReadingOcurrences:
							practiceMode === PracticeMode.ChooseReading
								? oldHiraganaStat.chooseReadingOcurrences + 1
								: oldHiraganaStat.chooseReadingOcurrences,
						chooseReadingCorrect:
							practiceMode === PracticeMode.ChooseReading && isCorrect
								? oldHiraganaStat.chooseReadingCorrect + 1
								: oldHiraganaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === PracticeMode.ChooseCharacter
								? oldHiraganaStat.chooseCharacterOcurrences + 1
								: oldHiraganaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === PracticeMode.ChooseCharacter && isCorrect
								? oldHiraganaStat.chooseCharacterCorrect + 1
								: oldHiraganaStat.chooseCharacterCorrect,
				  }
				: oldHiraganaStat;

		const katakanaStat =
			kanaSelection === KanaType.Katakana
				? {
						chooseReadingOcurrences:
							practiceMode === PracticeMode.ChooseReading
								? oldKatakanaStat.chooseReadingOcurrences + 1
								: oldKatakanaStat.chooseReadingOcurrences,
						chooseReadingCorrect:
							practiceMode === PracticeMode.ChooseReading && isCorrect
								? oldKatakanaStat.chooseReadingCorrect + 1
								: oldKatakanaStat.chooseReadingCorrect,
						chooseCharacterOcurrences:
							practiceMode === PracticeMode.ChooseCharacter
								? oldKatakanaStat.chooseCharacterOcurrences + 1
								: oldKatakanaStat.chooseCharacterOcurrences,
						chooseCharacterCorrect:
							practiceMode === PracticeMode.ChooseCharacter && isCorrect
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
