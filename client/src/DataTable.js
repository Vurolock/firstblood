import React from 'react';

const DataTable = (props) => {

    let data = Object.keys(props.data).map((summonerName, i) => {

        // Team color
        let teamColor =  props.data[summonerName].team + "-team";

        // Current player
        let currentPlayer = props.data[summonerName];

        // Current champion
        let currentChamp = currentPlayer.currentChamp;

        // Champion details
        let championDetails = currentPlayer.allChamps[currentChamp];

        // If championDetails is undefined, this is the first match the player has used this champion
        if (!championDetails) {
            return (
                <tr
                    className={[teamColor, "row"].join(' ')}
                    key={i}    
                >
                    <td>
                        {summonerName}<br />{currentPlayer.winRatio}<br />{currentPlayer.wins}W / {currentPlayer.losses}L
                    </td>
                    <td>{currentChamp}</td>
                    <td>First time</td>
                    <td>playing this</td>
                    <td>champion...</td>
                    <td>No data yet!</td>
                </tr>
            );
        } else {
            return (
                <tr
                    className={teamColor}
                    key={i}    
                >
                    <td>
                        {summonerName}<br />{currentPlayer.winRatio}<br />{currentPlayer.wins}W / {currentPlayer.losses}L
                    </td>
                    <td>{currentChamp}</td>
                    <td>{championDetails.winrate.value}<br />{championDetails.winrate.wins}W / {championDetails.winrate.losses}L</td>
                    <td>{championDetails.KDA.value}<br />{championDetails.KDA.kills} / {championDetails.KDA.deaths} / {championDetails.KDA.assists}</td>
                    <td>{championDetails.gold}</td>
                    <td>{championDetails.cs}</td>
                </tr>
            );
        }
    });

    return (
        <div className="data-container">
            {data}
        </div>
    );
}

export default DataTable;