import React from 'react';

import './NavItems.css';
import NavItem from './NavItem/NavItem'

const navItems = () => (
    <ul className='NavItems'>
        <NavItem link='/' exact>Home</NavItem>
        <NavItem link='/timeline'>Timeline</NavItem>
        <NavItem link='/about'>About Us</NavItem>
    </ul>
);

export default navItems;