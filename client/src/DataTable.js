import React from 'react';

const DataTable = (props) => {

    let tableData = Object.keys(props.data).map(summonerName => {
        let classColor = '';
        if (props.data[summonerName].team === "blue") {
            classColor = "table-primary";
        } else {
            classColor = "table-danger";
        }
        return (
            <tr className={classColor}>
                <td>{summonerName}</td>
                <td>100% 100W/0L</td>
                <td>{props.data[summonerName].currentChamp}</td>
                <td>100% 25W/0L</td>
                <td>5.55 10/3/6</td>
                <td>8,043</td>
                <td>45</td>
            </tr>
        );
    })
    return (
        <table className="table table-hover data-table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Ranked Winrate</th>
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