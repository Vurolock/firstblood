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

        // Current champion
        let currentChamp = props.data[summonerName].currentChamp;
        console.log(currentChamp);

        return (
            <tr
                className={classColor}
                key={i}    
            >
                <td>
                    {summonerName}<br />{props.data[summonerName].winRatio}    {props.data[summonerName].wins}W / {props.data[summonerName].losses}L
                </td>
                <td>{currentChamp}</td>
                <td>100% 25W/0L</td>
                <td>5.55 10/3/6</td>
                <td>{props.data[summonerName].allChamps[currentChamp].gold}</td>
                <td>{props.data[summonerName].allChamps[currentChamp].cs}</td>
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