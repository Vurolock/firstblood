const fs = require('fs');
const getAllChampions = require('./getAllChampions');

const allChampions = JSON.parse(
  fs.readFileSync(`${__dirname}/allChampions.json`)
);

const apiTransform = participants => {
  const players = participants.map(participant => {
    // Team
    const team = participant.teamId === 100 ? 'blue' : 'red';

    // Champion
    const champion =
      allChampions.find(champion => champion.id === participant.championId) ||
      getAllChampions().then(champions => {
        console.log(champions);
        return champions.find(
          champion => champion.id === participant.championId
        );
      });

    // Create player
    player = {
      team,
      champion,
      name: participant.summonerName
    };
    return player;
  });
  return players;
};

const mockParticipants = [
  {
    championId: 412,
    summonerName: 'Summoner1',
    teamId: 100
  }
];

console.log(apiTransform(mockParticipants));

module.exports = apiTransform;
