# First Blood
First Blood is a companion web application built for League of Legends to help players prepare for the match. As soon as the loading screen appears, a summoner can search their name and this application will display statistics such as win ratios and KDA. This can be used for anyone currently in a LoL match in NA.

The data in this application was collected using Riot's Developer API, as well as cheerio.js to parse OP.GG. Due to Riot's API endpoint organization, collecting this data from their API alone could easily be over 1000s of calls every search, which isn't possible with rate-limiting, and isn't a good idea regardless. To get around this, cheerio.js is used to collect data from OP.GG once the application has accessed Riot's API, which will respond with the current players in the match.

This application was built with React.js for a smooth client-side experience, and Express on the server-side to make API calls and build the data object used to render in the browser.

If you find this application useful, please support OP.GG, since I wouldn't have been able to do this without them!
