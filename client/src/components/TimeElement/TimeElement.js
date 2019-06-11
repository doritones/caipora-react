import React from 'react';

import './TimeElement.css'

const options = { year: 'numeric', month: 'long', day: 'numeric' }; //options to parse date in long format
const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', options).format(new Date(date)); // for different date format, change string on method

const timeElement = (props) => (
    <li className='TimeElement'>
        <div>
            <time>{formatDate(props.date)}</time>
            <p>{props.text}</p>
            <p>{props.source}</p>
            <p>Tags: {props.tags}</p>
        </div>
    </li>
);

export default timeElement;