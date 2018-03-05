import React from 'react';

const Header = (props) => {

    return (
        <header>
            <div className="title">First Blood</div>
            <div className="search">
                <form>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={props.currentInput}
                        onChange={ (event) => props.changeHandler(event.target.value) }
                    />
                    <button
                        type="button"
                        onClick={ () => {
                           props.clickHandler(props.currentInput)
                        }}>
                        <img src="./images/search.png" alt="" />
                    </button>
                </form>
            </div>
        </header>
    );
}

export default Header;