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
        const options = {
            uri: 'http://na.op.gg/summoner/champions/userName=Vurolok',
            transform: (body) => cheerio.load(body)
        };
        rp(options)
        .then($ => {
            let opggData = {};

            $('.Body .Row').each((i, element) => {
                // Sets context for element selection
                let tableRowHtml = $(element).html();

                // Name
                opggData[i] = { "name" : $('.ChampionName a', tableRowHtml).text() };

                // Win ratio data
                opggData[i].winrate = { "value": $('.WinRatio', tableRowHtml).text() };

                // If no wins or losses sets value to "0" instead of empty string
                if (!$('.Text.Left', tableRowHtml).text()) {
                    opggData[i].winrate.wins = "0";
                } else {
                    opggData[i].winrate.wins = $('.Text.Left', tableRowHtml).text().slice(0, -1);
                }

                if (!$('.Text.Right', tableRowHtml).text()) {
                    opggData[i].winrate.losses = "0";
                } else {
                    opggData[i].winrate.losses = $('.Text.Right', tableRowHtml).text().slice(0, -1);
                }

                // KDA data
                opggData[i].KDA = { "value": $('.KDA.Cell', tableRowHtml).data('value') + "" };
                opggData[i].KDA.kills = $('.Kill', tableRowHtml).text();
                opggData[i].KDA.deaths = $('.Death', tableRowHtml).text();
                opggData[i].KDA.assists = $('.Assist', tableRowHtml).text();

                // Gold
                opggData[i].gold = $('.KDA', tableRowHtml).next().text().slice(6, -5);

                // CS
                opggData[i].cs = $('.KDA', tableRowHtml).next().next().text().slice(6, -5);
            });
            return opggData;
        })
        .catch((err) => {
            console.log(err);
        })
        .then((opggData) => {
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
