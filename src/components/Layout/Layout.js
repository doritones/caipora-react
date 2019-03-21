import React, { Component } from 'react';

import TopMenu from '../Navigation/TopMenu/TopMenu'
import SideMenu from '../Navigation/SideMenu/SideMenu';
import './Layout.css';

// Using Fragment to avoid extra nodes when rendering multiple Components
// Check documentation on https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html

class Layout extends Component {
    state = {
		showSideMenu: false
	}

	sideMenuClosedHandler = () => {
		this.setState({ showSideMenu: false });
	}

	sideMenuToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideMenu: !prevState.showSideMenu }
		});
	}

    render() {
        return (
            <React.Fragment>
                <TopMenu menuToggleClicked={this.sideMenuToggleHandler} />
                <SideMenu 
					open={this.state.showSideMenu} 
					closed={this.sideMenuClosedHandler} />
                <main className='Content'>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;