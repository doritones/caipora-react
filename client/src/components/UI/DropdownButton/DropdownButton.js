import React from 'react';

import './DropdownButton.css';

const dropdownButton = (props) => (
    <div className="Dropdown">
        <button className="DropdownButton">{props.text}</button>
        <div className="DropdownContent">
             {props.items.map(item => {
                 return (
                    <p key={item} onClick={() => props.filter(item)}>{item}</p>
                 );
             })}
        </div>
    </div>
);

export default dropdownButton;