require('dotenv').config()
const axios = require('axios');
const express = require('express');
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
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/vurolok?api_key=${API_KEY}`)
            .then((summonerData) => {
                axios.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${summonerData.data.accountId}?api_key=${API_KEY}`)
                    .then((matchlistData) => {
                        res.json(matchlistData.data);
                    });
            });
    });

module.exports = router;
