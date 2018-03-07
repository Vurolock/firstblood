import React from 'react';

const DataTable = (props) => {
    if (props.data) {
        let data = Object.keys(props.data).map((summonerName, i) => {

            // Team color
            let teamColor =  props.data[summonerName].team + "-team";

            if (i % 2 !== 0 && teamColor === "blue-team") {
                teamColor = "blue-team-dark";

            } else if (i % 2 !== 0 && teamColor === "red-team") {
                teamColor = "red-team-dark";
            }

            // Border radius on top and bottom rows
            let rowRadius = '';
            if (i === 0) {
                rowRadius = "top-row";

            } else if (i === 9) {
                rowRadius = "bottom-row";
            }

            // Current player
            let currentPlayer = props.data[summonerName];

            // Current champion
            let currentChamp = currentPlayer.currentChamp;

            // Champion details
            let championDetails = currentPlayer.allChamps[currentChamp];

            // If championDetails is undefined, this is the first match the player has used this champion
            if (!championDetails) {
                return (
                    <div
                        className={`${teamColor} ${rowRadius} row`}
                        key={i}    
                    >

                        <div className="summoner">

                            <div className="s-name">
                                {summonerName}
                            </div>

                            <div className="s-wr">
                                {currentPlayer.winRatio} {currentPlayer.wins}W/{currentPlayer.losses}L
                            </div>

                        </div>

                        <div className="champion">

                            <div className="c-name">
                                {currentChamp}
                            </div>

                            <div className="c-wr">
                                No data yet
                            </div>

                        </div>

                    </div>
                );
            } else {
                return (
                    <div
                        className={`${teamColor} ${rowRadius} row`}
                        key={i}    
                    >

                        <div className="summoner">

                            <div className="s-name">
                                {summonerName}
                            </div>

                            <div className="s-wr">
                                WR {currentPlayer.winRatio} {currentPlayer.wins}W/{currentPlayer.losses}L
                            </div>

                        </div>

                        <div className="champion">

                            <div className="top-mini-row">

                                <div className="c-name">
                                    {currentChamp}
                                </div>

                                <div className="kda">
                                    KDA {championDetails.KDA.value} {championDetails.KDA.kills}/{championDetails.KDA.deaths}/{championDetails.KDA.assists}
                                </div>

                            </div>

                            <div className="bottom-mini-row">

                                <div className="c-wr">
                                    WR {championDetails.winrate.value} {championDetails.winrate.wins}W/{championDetails.winrate.losses}L
                                </div>

                                <div className="gold">
                                    {championDetails.gold}g
                                </div>

                                <div className="cs">
                                    {championDetails.cs}cs
                                </div>

                            </div>

                        </div>

                    </div>
                );
            }
        });

        return (
            <div className="data-container">
                {data}
            </div>
        );
    } else {
        return null;
    }
}

export default DataTable;