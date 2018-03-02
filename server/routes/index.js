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
        .then(($) => {
            let opggData = {};
            $('.ChampionName a').each((i, name) => {
                opggData[i] = {"name" : $(name).text()};
            });
            console.log(opggData);
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
