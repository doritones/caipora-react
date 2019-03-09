import React from 'react';

import'./TopMenu.css';
import NavItems from '../NavItems/NavItems'

const topMenu = (props) => (
    <header className="TopMenu">
        <div className='Logo'>
            <p>Caipora</p>
        </div>
        <nav className='Desktop'>
            <NavItems />
        </nav>
    </header>
);

export default topMenu;