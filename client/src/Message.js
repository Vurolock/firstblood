import React from 'react';

const Message = (props) => {
    if (props.message) {
        return (
            <div className="message">
				{props.message}
			</div>
        );
    } else {
        return null;
    }
}

export default Message;