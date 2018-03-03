const championList = require('./champion-list');

const apiTransform = (participants) => {

	let team = '';
	let champion = '';

	let players = participants.map(player => {

		// Team
		if (player.teamId === 100) {
			team = 'blue'
		} else if (player.teamId === 200) {
			team = 'red'
		}

		// Champion
		for (var i = 0; i < championList.length; i++) {
			if (player.championId === championList[i].id) {
				champion = championList[i].name;
				break;
			}
		}

		// Create object
		player = {
			"team": team,
			"champion": champion,
			"name": player.summonerName
		}
		return player;
	});
	return players;
}

module.exports = apiTransform;