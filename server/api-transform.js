const fs = require('fs');

const allChampions = JSON.parse(
  fs.readFileSync(`${__dirname}/allChampions.json`)
);

const apiTransform = participants => {
  let team = '';
  let champion = '';

  let players = participants.map(player => {
    // Team
    if (player.teamId === 100) {
      team = 'blue';
    } else if (player.teamId === 200) {
      team = 'red';
    }

    // Champion
    for (var i = 0; i < allChampions.length; i++) {
      if (player.championId === allChampions[i].id) {
        champion = allChampions[i].name;
        break;
      }
    }

    // Create object
    player = {
      team: team,
      champion: champion,
      name: player.summonerName
    };
    return player;
  });
  return players;
};

module.exports = apiTransform;
