import React from 'react';

const DataTable = (props) => {

    let tableData = Object.keys(props.data).map((summonerName, i) => {

        // Team color
        let classColor = '';
        if (props.data[summonerName].team === "blue") {
            classColor = "table-primary";
        } else {
            classColor = "table-danger";
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
                <tr
                    className={classColor}
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
        }

        return (
            <tr
                className={classColor}
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
    })
    return (
        <table className="table table-hover data-table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Summoner</th>
                    <th scope="col">Champion</th>
                    <th scope="col">Winrate</th>
                    <th scope="col">KDA</th>
                    <th scope="col">Gold</th>
                    <th scope="col">CS</th>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    );
}

export default DataTable;