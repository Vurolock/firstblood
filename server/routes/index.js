require('dotenv').config()
const axios = require('axios');
const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

const apiTransform = require('../api-transform');

router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

router.route('/')
    .get((req, res) => {
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/shiphtur?api_key=${process.env.API_KEY}`)
            .then((summonerData) => {
                axios.get(`https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerData.data.id}?api_key=${process.env.API_KEY}`)
                    .then((spectator) => {
                        let summoners = apiTransform(spectator.data.participants);
                        res.json(summoners);
                    });
            });
    });


router.route('/scrape')
.post((req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${req.body.name}?api_key=${process.env.API_KEY}`)
    .catch(err => {
        console.log(err.response);
        res.json({
            message: 'That summoner does not exist.'
        });
    })
    .then((summonerData) => {
        axios.get(`https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerData.data.id}?api_key=${process.env.API_KEY}`)
        .catch(err => {
            console.log(err.response);
            res.json({
                message: 'That summoner is not currently in game. Check your spelling or try again in a few seconds.'
            });
        })
        .then((spectator) => {
            let summoners = apiTransform(spectator.data.participants);
            let opggData = {};

            let promises = summoners.map(summoner => {
                const encodedURI = encodeURI(`http://na.op.gg/summoner/champions/userName=${summoner.name}`);
                const options = {
                    uri: encodedURI,
                    transform: (body) => cheerio.load(body)
                };

                return rp(options).then($ => {
                    let currentSummoner = {};

                    $('.Body .Row').each((i, element) => {
                        // Sets context for element selection
                        let tableRowHtml = $(element).html();

                        // Name
                        let champName = $('.ChampionName a', tableRowHtml).text();
                        currentSummoner[champName] = {};

                        // Win ratio data
                        currentSummoner[champName].winrate = { "value": $('.WinRatio', tableRowHtml).text() };

                        // If no wins or losses sets value to "0" instead of empty string
                        if (!$('.Text.Left', tableRowHtml).text()) {
                            currentSummoner[champName].winrate.wins = "0";
                        } else {
                            currentSummoner[champName].winrate.wins = $('.Text.Left', tableRowHtml).text().slice(0, -1);
                        }

                        if (!$('.Text.Right', tableRowHtml).text()) {
                            currentSummoner[champName].winrate.losses = "0";
                        } else {
                            currentSummoner[champName].winrate.losses = $('.Text.Right', tableRowHtml).text().slice(0, -1);
                        }

                        // KDA data
                        currentSummoner[champName].KDA = { "value": $('.KDA.Cell', tableRowHtml).data('value') + "" };
                        currentSummoner[champName].KDA.kills = $('.Kill', tableRowHtml).text();
                        currentSummoner[champName].KDA.deaths = $('.Death', tableRowHtml).text();
                        currentSummoner[champName].KDA.assists = $('.Assist', tableRowHtml).text();

                        // Gold
                        currentSummoner[champName].gold = $('.KDA', tableRowHtml).next().text().slice(6, -5);

                        // CS
                        currentSummoner[champName].cs = $('.KDA', tableRowHtml).next().next().text().slice(6, -5);
                    });
                    return currentSummoner;
                });
            });

            Promise.all(promises)
            .then(promises => {
                summoners.forEach((summoner, i) => {
                    
                    // Total wins
                    let championList = promises[i];
                    let winsArray = Object.keys(championList).map(champion => {
                        return parseInt(championList[champion].winrate.wins, 10);
                    })

                    let totalWins = winsArray.reduce((total, value) => {
                        return total += value;
                    }, 0);

                    // Total losses
                    let lossesArray = Object.keys(championList).map(champion => {
                        return parseInt(championList[champion].winrate.losses, 10);
                    })

                    let totalLosses = lossesArray.reduce((total, value) => {
                        return total += value;
                    }, 0);

                    // Total win ratio
                    let totalWinRatio = (Math.round(totalWins/(totalWins + totalLosses) * 100)) + '%';

                    opggData[summoner.name] = {
                        "team": summoner.team,
                        "currentChamp": summoner.champion,
                        "allChamps": promises[i],
                        "wins": totalWins,
                        "losses": totalLosses,
                        "winRatio": totalWinRatio
                    };
                });
                res.json(opggData);
            });
        });
    });
});

module.exports = router;


/*
    Endpoint Chain:

    Submit input               -->  /lol/summoner/v3/summoners/by-name/{summonerName}       (1)  returns:
    summonerId + accountId[0]  -->  /lol/spectator/v3/active-games/by-summoner/{summonerId} (1)  returns:
    summonerName[1-9]          -->  SCRAPE
*/
