const championList = require('./champion-list');

let testParticipants = [
  {
    "teamId": 100,
    "spell1Id": 4,
    "spell2Id": 14,
    "championId": 412,
    "profileIconId": 3368,
    "summonerName": "Blademanzen",
    "bot": false,
    "summonerId": 23573965,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8439,
        8463,
        8430,
        8242,
        8313,
        8321
      ],
      "perkStyle": 8400,
      "perkSubStyle": 8300
    }
  },
  {
    "teamId": 100,
    "spell1Id": 6,
    "spell2Id": 12,
    "championId": 27,
    "profileIconId": 22,
    "summonerName": "singed420",
    "bot": false,
    "summonerId": 34597146,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8439,
        8473,
        8429,
        8242,
        8243,
        8234
      ],
      "perkStyle": 8400,
      "perkSubStyle": 8200
    }
  },
  {
    "teamId": 100,
    "spell1Id": 4,
    "spell2Id": 7,
    "championId": 21,
    "profileIconId": 3159,
    "summonerName": "Krystic",
    "bot": false,
    "summonerId": 19942396,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8229,
        8226,
        8234,
        8237,
        8009,
        8014
      ],
      "perkStyle": 8200,
      "perkSubStyle": 8000
    }
  },
  {
    "teamId": 100,
    "spell1Id": 12,
    "spell2Id": 4,
    "championId": 131,
    "profileIconId": 1149,
    "summonerName": "Arcsecond",
    "bot": false,
    "summonerId": 27470522,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8112,
        8143,
        8138,
        8135,
        8224,
        8233
      ],
      "perkStyle": 8100,
      "perkSubStyle": 8200
    }
  },
  {
    "teamId": 100,
    "spell1Id": 4,
    "spell2Id": 11,
    "championId": 24,
    "profileIconId": 539,
    "summonerName": "AceWindstorm",
    "bot": false,
    "summonerId": 24858900,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8112,
        8143,
        8136,
        8135,
        8234,
        8237
      ],
      "perkStyle": 8100,
      "perkSubStyle": 8200
    }
  },
  {
    "teamId": 200,
    "spell1Id": 4,
    "spell2Id": 14,
    "championId": 201,
    "profileIconId": 4,
    "summonerName": "Lava",
    "bot": false,
    "summonerId": 19812679,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8465,
        8473,
        8429,
        8242,
        8347,
        8321
      ],
      "perkStyle": 8400,
      "perkSubStyle": 8300
    }
  },
  {
    "teamId": 200,
    "spell1Id": 4,
    "spell2Id": 7,
    "championId": 110,
    "profileIconId": 3163,
    "summonerName": "Boosted bot",
    "bot": false,
    "summonerId": 50453166,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8021,
        9101,
        9103,
        8014,
        8234,
        8236
      ],
      "perkStyle": 8000,
      "perkSubStyle": 8200
    }
  },
  {
    "teamId": 200,
    "spell1Id": 11,
    "spell2Id": 4,
    "championId": 28,
    "profileIconId": 3155,
    "summonerName": "Sunset",
    "bot": false,
    "summonerId": 63291,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8112,
        8143,
        8136,
        8105,
        8234,
        8236
      ],
      "perkStyle": 8100,
      "perkSubStyle": 8200
    }
  },
  {
    "teamId": 200,
    "spell1Id": 12,
    "spell2Id": 4,
    "championId": 38,
    "profileIconId": 23,
    "summonerName": "Shiphtur",
    "bot": false,
    "summonerId": 19967304,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8229,
        8243,
        8210,
        8237,
        8009,
        8014
      ],
      "perkStyle": 8200,
      "perkSubStyle": 8000
    }
  },
  {
    "teamId": 200,
    "spell1Id": 12,
    "spell2Id": 4,
    "championId": 122,
    "profileIconId": 742,
    "summonerName": "Blânk",
    "bot": false,
    "summonerId": 21618783,
    "gameCustomizationObjects": [
      
    ],
    "perks": {
      "perkIds": [
        8230,
        8224,
        8234,
        8236,
        9111,
        9104
      ],
      "perkStyle": 8200,
      "perkSubStyle": 8000
    }
  }
];
let team = '';
let champion = '';

let players = testParticipants.map(player => {

	// Team
    if (player.teamId === 100) {
        team = 'blue'

    } else if (player.teamId === 200) {
        team = 'red'
    }

	// Champion

	for (var i = 0; i < championList.length; i++) {
		// console.log(`${player.championId} =========== ${championList.id}`);
		if (player.championId === championList[i].id) {
			champion = championList[i].name;
			break;
		}
	}

    player = {
        "team": team,
        "champion": champion,
        "name": player.summonerName
    }
    return player;
});

console.log(players);
// console.log(championList);

