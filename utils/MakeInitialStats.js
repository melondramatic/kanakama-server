MakeInitialStats = () => {
	const userStats = [];
	for (let i = 0; i < 46; i++) {
		const kanaStat = {
			hiraganaStat: {
				chooseReadingOcurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOcurrences: 0,
				chooseCharacterCorrect: 0,
			},
			katakanaStat: {
				chooseReadingOcurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOcurrences: 0,
				chooseCharacterCorrect: 0,
			},
		};
		userStats.push(kanaStat);
	}
	return JSON.stringify(userStats);
};

module.exports = MakeInitialStats;
