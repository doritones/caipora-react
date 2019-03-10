import React from 'react';

const timeElement = (props) => (
    <li key={props.id}>
        <div>
            <time>{props.date}</time>
            <p>{props.text}</p>
            <p>{props.source}</p>
        </div>
    </li>
);

export default timeElement;