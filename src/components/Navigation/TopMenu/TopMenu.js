import React from 'react';

import NavItems from '../NavItems/NavItems';
import Toggle from '../SideMenu/Toggle/Toggle';
import'./TopMenu.css';

const topMenu = (props) => (
    <header className="TopMenu">
        <Toggle clicked={props.menuToggleClicked}/>
        <div className='Logo'>
            <p>Caipora</p>
        </div>
        <nav className='Desktop'>
            <NavItems />
        </nav>
    </header>
);

export default topMenu;