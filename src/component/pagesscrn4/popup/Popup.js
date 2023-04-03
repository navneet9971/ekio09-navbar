import React from 'react';
import './Popup.css?22';
import { AiFillCloseCircle } from 'react-icons/ai';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
           <div className="popup-inner">
            <AiFillCloseCircle className="close-btn" size={25} onClick={() => props.setTrigger(false)}>close</AiFillCloseCircle>
            { props.children }
           </div>
        </div>
    ) : "";
}

export default Popup;