import React from 'react';

import './TimeElement.css'

const timeElement = (props) => (
    <li className='TimeElement'>
        <div>
            <time>{props.date}</time>
            <p>{props.text}</p>
            <p>{props.source}</p>
        </div>
    </li>
);

export default timeElement;