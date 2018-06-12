import React from 'react';

const Header = (props) => {

    let gameToggleClass = "game";
    let lobbyToggleClass = "lobby faded";

    if (props.toggle === "lobby") {
        gameToggleClass = "game faded";
        lobbyToggleClass = "lobby"
    }

    return (
        <header>
            <div className="title">
                First Blood
            </div>

            <div className="search">

                <form
                    onSubmit={ (event) => {
                        event.preventDefault();
                        props.clickHandler(props.currentInput);
                    }}
                >

                    <input
                        className="input"
                        type="text"
                        placeholder="Search a Summoner..."
                        value={props.currentInput}
                        onChange={ (event) => props.changeHandler(event.target.value) }
                    />

                    <button
                        type="button"
                        onClick={ () => props.clickHandler(props.currentInput) }
                    >
                        <img src="./images/search.png" alt="" />
                    </button>

                </form>

            </div>

            <div className="game-lobby-toggle">
                
                <div
                    className={ gameToggleClass }
                    onClick={ () => props.toggleHandler("game") }
                >
                    Game
                </div>

                <div
                    className={ lobbyToggleClass }
                    onClick={ () => props.toggleHandler("lobby") }
                >
                    Lobby
                </div>

            </div>

        </header>
    );
}

export default Header;