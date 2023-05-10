import React from 'react';
import './Message.css';
import { AiFillCloseCircle } from 'react-icons/ai';

function Message(props) {
    return (props.trigger) ? (
        <div className="message">
           <div className="message-inner">
            <AiFillCloseCircle className="close-btn" size={25} onClick={() => props.setTrigger(false)}>close</AiFillCloseCircle>
            { props.children }
           </div>
        </div>
    ) : "";
}

export default Message;