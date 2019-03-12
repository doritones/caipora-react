import React from 'react';

const timeElement = (props) => (
    <li>
        <time>{props.date}</time>
        <p>{props.text}</p>
        <p>{props.source}</p>
        
    </li>
);

export default timeElement;