import React from 'react';

import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideMenu.css';

const sideMenu = (props) => {
    let attachedClasses = ['SideMenu', 'Close'];
    if (props.open) {
        attachedClasses = ['SideMenu', 'Open'];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </React.Fragment>
    )
};

export default sideMenu;