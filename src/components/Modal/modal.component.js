import React from 'react';
import './modal.style.css';

export default (props) => (
    props.show && <div className="modal-container">
        <div className="backdrop"></div>
        <div className={`modal-box ${props.size}`}>{props.children}</div>
    </div>
)