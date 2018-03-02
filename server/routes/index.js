require('dotenv').config()
const axios = require('axios');
const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const router = express.Router();

const API_KEY = process.env.API_KEY;

// router.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     next();
// })

router.route('/')
    .get((req, res) => {
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/shiphtur?api_key=${API_KEY}`)
            .then((summonerData) => {
                axios.get(`https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${summonerData.data.id}?api_key=${API_KEY}`)
                    .then((spectator) => {
                        res.json(spectator.data.participants);
                    });
            });
    });


router.route('/scrape')
    .get((req, res) => {

        let opggData = {};
        const summoners = ['Vurolok', 'eHug', 'Dyrus', 'Shiphtur', 'AKoreanNinja', 'TF Blade', 'FQ Fly', 'Ssumdayday', 'Yoplait63', 'OmarGod'];
        const testArr = ['Vurolok'];

        let promises = summoners.map(test => {

            const options = {
                uri: `http://na.op.gg/summoner/champions/userName=${test}`,
                transform: (body) => cheerio.load(body)
            };
            return rp(options)
            .then($ => {
                let currentSummoner = {};

                $('.Body .Row').each((i, element) => {
                    // Sets context for element selection
                    let tableRowHtml = $(element).html();

                    // Name
                    currentSummoner[i] = { "name" : $('.ChampionName a', tableRowHtml).text() };

                    // Win ratio data
                    currentSummoner[i].winrate = { "value": $('.WinRatio', tableRowHtml).text() };

                    // If no wins or losses sets value to "0" instead of empty string
                    if (!$('.Text.Left', tableRowHtml).text()) {
                        currentSummoner[i].winrate.wins = "0";
                    } else {
                        currentSummoner[i].winrate.wins = $('.Text.Left', tableRowHtml).text().slice(0, -1);
                    }

                    if (!$('.Text.Right', tableRowHtml).text()) {
                        currentSummoner[i].winrate.losses = "0";
                    } else {
                        currentSummoner[i].winrate.losses = $('.Text.Right', tableRowHtml).text().slice(0, -1);
                    }

                    // KDA data
                    currentSummoner[i].KDA = { "value": $('.KDA.Cell', tableRowHtml).data('value') + "" };
                    currentSummoner[i].KDA.kills = $('.Kill', tableRowHtml).text();
                    currentSummoner[i].KDA.deaths = $('.Death', tableRowHtml).text();
                    currentSummoner[i].KDA.assists = $('.Assist', tableRowHtml).text();

                    // Gold
                    currentSummoner[i].gold = $('.KDA', tableRowHtml).next().text().slice(6, -5);

                    // CS
                    currentSummoner[i].cs = $('.KDA', tableRowHtml).next().next().text().slice(6, -5);
                });
                return currentSummoner;
            });
        });

        Promise.all(promises)
        .catch((err) => {
            console.log(err);
        })
        .then((promises) => {
            summoners.forEach((summoner, i) => {
                opggData[summoner] = promises[i];
            });
            res.json(opggData);
        })

    });

router.route('/favicon.ico')
    .get((req, res) => {
        res.json('');
    })

module.exports = router;


/*
    Endpoint Chain:

    Submit input               -->  /lol/summoner/v3/summoners/by-name/{summonerName}       (1)  returns:
    summonerId + accountId[0]  -->  /lol/spectator/v3/active-games/by-summoner/{summonerId} (1)  returns:
    summonerName[1-9]          -->  /lol/summoner/v3/summoners/by-name/{summonerName}       (9)  returns:
    accountId[1-9]             -->  /lol/match/v3/matchlists/by-account/{accountId}        (10)  returns:
    gameId[0-n] + champion     -->  /lol/match/v3/matches/{matchId}                         (n)  returns:
    K/D/A + CS + W/L           -->  Database  -->  Client
*/
