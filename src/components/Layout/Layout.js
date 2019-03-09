import React, { Component } from 'react';

import TopMenu from '../Navigation/TopMenu/TopMenu'

// Using Fragment to avoid extra nodes when rendering multiple Components
// Check documentation on https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <TopMenu />
            </React.Fragment>
        )
    }
}

export default Layout;