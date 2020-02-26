const fs = require('fs');
const axios = require('axios');

const getAllChampions = () => {
  return axios
    .get('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(res => {
      return res.data[0];
    })
    .then(version => {
      return axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
    })
    .then(res => {
      const allChampions = Object.values(res.data.data).map(champion => {
        return {
          name: champion.name,
          id: parseInt(champion.key, 10)
        };
      });
      fs.writeFile(
        `${__dirname}/allChampions.json`,
        JSON.stringify(allChampions, null, 1),
        err => {
          if (err) throw err;
        }
      );
      return allChampions;
    });
};

module.exports = getAllChampions;
