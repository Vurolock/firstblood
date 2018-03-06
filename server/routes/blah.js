let blah = { 'Kha\'Zix': 
   { winrate: { value: '71%', wins: '5', losses: '2' },
     KDA: { value: '5.61', kills: '9.4', deaths: '2.6', assists: '5.0' },
     gold: '11,439',
     cs: '154.7' },
  Jax: 
   { winrate: { value: '67%', wins: '4', losses: '2' },
     KDA: { value: '3.87', kills: '4.0', deaths: '2.5', assists: '5.7' },
     gold: '9,894',
     cs: '153.0' },
  Kayn: 
   { winrate: { value: '80%', wins: '4', losses: '1' },
     KDA: { value: '4.06', kills: '7.2', deaths: '3.6', assists: '7.4' },
     gold: '12,775',
     cs: '187.6' },
  Zac: 
   { winrate: { value: '75%', wins: '3', losses: '1' },
     KDA: { value: '4.75', kills: '2.5', deaths: '3.0', assists: '11.8' },
     gold: '9,774',
     cs: '140.3' },
  Skarner: 
   { winrate: { value: '100%', wins: '3', losses: '0' },
     KDA: { value: '4.27', kills: '4.0', deaths: '3.7', assists: '11.7' },
     gold: '11,689',
     cs: '167.7' },
  Hecarim: 
   { winrate: { value: '67%', wins: '2', losses: '1' },
     KDA: { value: '3.89', kills: '7.3', deaths: '3.0', assists: '4.3' },
     gold: '10,617',
     cs: '137.0' },
  Evelynn: 
   { winrate: { value: '67%', wins: '2', losses: '1' },
     KDA: { value: '7.25', kills: '9.7', deaths: '2.7', assists: '9.7' },
     gold: '13,827',
     cs: '173.7' },
  Volibear: 
   { winrate: { value: '100%', wins: '2', losses: '0' },
     KDA: { value: '3.44', kills: '8.0', deaths: '4.5', assists: '7.5' },
     gold: '11,973',
     cs: '160.5' },
  Sejuani: 
   { winrate: { value: '100%', wins: '2', losses: '0' },
     KDA: { value: '7', kills: '5.5', deaths: '2.0', assists: '8.5' },
     gold: '12,567',
     cs: '182.5' },
  Braum: 
   { winrate: { value: '100%', wins: '2', losses: '0' },
     KDA: { value: '5.75', kills: '2.0', deaths: '2.0', assists: '9.5' },
     gold: '7,332',
     cs: '63.5' },
  Olaf: 
   { winrate: { value: '100%', wins: '2', losses: '0' },
     KDA: { value: '10.67', kills: '6.5', deaths: '1.5', assists: '9.5' },
     gold: '10,730',
     cs: '135.5' },
  Xayah: 
   { winrate: { value: '50%', wins: '1', losses: '1' },
     KDA: { value: '3.6', kills: '4.5', deaths: '2.5', assists: '4.5' },
     gold: '9,619',
     cs: '184.0' },
  Shen: 
   { winrate: { value: '100%', wins: '1', losses: '0' },
     KDA: { value: '14', kills: '3.0', deaths: '1.0', assists: '11.0' },
     gold: '8,308',
     cs: '75.0' },
  Varus: 
   { winrate: { value: '100%', wins: '1', losses: '0' },
     KDA: { value: '3.2', kills: '9.0', deaths: '5.0', assists: '7.0' },
     gold: '15,897',
     cs: '272.0' },
  Shyvana: 
   { winrate: { value: '100%', wins: '1', losses: '0' },
     KDA: { value: '8.5', kills: '4.0', deaths: '2.0', assists: '13.0' },
     gold: '9,992',
     cs: '159.0' },
  Janna: 
   { winrate: { value: '0%', wins: '0', losses: '1' },
     KDA: { value: '0.33', kills: '2.0', deaths: '6.0', assists: '0.0' },
     gold: '6,117',
     cs: '40.0' },
  Rengar: 
   { winrate: { value: '0%', wins: '0', losses: '1' },
     KDA: { value: '1.33', kills: '7.0', deaths: '9.0', assists: '5.0' },
     gold: '13,573',
     cs: '223.0' },
  Elise: 
   { winrate: { value: '0%', wins: '0', losses: '1' },
     KDA: { value: '2.5', kills: '4.0', deaths: '2.0', assists: '1.0' },
     gold: '5,955',
     cs: '78.0' },
  Camille: 
   { winrate: { value: '0%', wins: '0', losses: '1' },
     KDA: { value: '1.56', kills: '7.0', deaths: '9.0', assists: '7.0' },
     gold: '13,182',
     cs: '195.0' },
  Zoe: 
   { winrate: { value: '0%', wins: '0', losses: '1' },
     KDA: { value: '0.5', kills: '2.0', deaths: '6.0', assists: '1.0' },
     gold: '5,974',
     cs: '105.0' }
}

let totalWins = Object.keys(blah).map(singleBlah => {
    return parseInt(blah[singleBlah].winrate.wins, 10);
})

console.log(totalWins);

let reducedTotalWins = totalWins.reduce((total, value) => {
    return total += value;
}, 0);

console.log(reducedTotalWins);