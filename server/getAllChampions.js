const fs = require('fs');
const axios = require('axios');

axios
  .get('https://ddragon.leagueoflegends.com/api/versions.json')
  .then(res => {
    return res.data[0];
  })
  .then(version => {
    return axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
  })
  .then(res => {
    const allChampions = Object.values(res.data.data).map(champion => {
      return {
        name: champion.name,
        id: parseInt(champion.key, 10)
      };
    });
    fs.writeFileSync(
      `${__dirname}/allChampions.json`,
      JSON.stringify(allChampions, null, 1)
    );
  });
