import React from 'react';

const Loader = (props) => {
    if (props.loading) {
        return (
            <div className="loading">
                <img src="./images/loading.gif" alt='' />
            </div>
        );
    } else {
        return null;
    }
}

export default Loader;