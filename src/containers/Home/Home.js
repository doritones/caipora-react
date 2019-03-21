import React from 'react';

import './Home.css';

class Home extends React.Component {
    constructor (props) {
        super (props)
        this.timer = this.timer.bind(this);
        this.state = {
            timer: null
        }
    }
    componentDidMount() {
        this.counter = setInterval(this.timer, 1000);
    }

    componentWillUnmount () {
        if (this.counter) {
            clearInterval(this.counter)
            this.counter = null
          }
    }

    timer() {
        const dateStart = new Date('2019-01-01');
        const curDate = new Date();
        const timeGap = Math.abs(curDate - dateStart)/1000;
        const currentDef = (timeGap * 0.03).toFixed(2);
        this.setState({ timer: currentDef })
    }

    render () {
        return(
            <div className='Home'>
                <div className='HomeContent'>
                    {/* <!--- Image used only for study purpose, will be changed in final version, with correct credit --> */}
                    <h3 className='HomeText'>Since the beginning of the last government term in Brazil,<br/><span className='HomeTimer'>{this.state.timer}</span><br/> soccer fields were deforested.</h3>
                </div>
        </div>
        );
    }
}

export default Home;