import React from 'react';

import TimeElement from './TimeElement/TimeElement';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Timeline.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeline: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch("https://api.airtable.com/v0/appGU1IvnOZqFFiCh/Table%201?view=Grid%20view", {
            headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_API_KEY } //using .env and sourcing before starting Node
        })
            .then(data => data.json())
            .then(data => {
                let timelineArr = [];
                data.records.forEach(record =>  {
                    let timelineItem = {
                        id: record.id,
                        date: record.fields['Publicado'],
                        text: record.fields['Texto'],
                        source: record.fields['Canal']
                    };
                    timelineArr.push(timelineItem);
                });
                return this.setState({ timeline: timelineArr, loading: false });
            })
            .catch(err => console.log(err));
    }

    render() {
        let timeElement = this.state.timeline.map(elem => 
            <TimeElement
                key={elem.id}
                date={elem.date}
                text={elem.text}
                source={elem.source}
            />
        )
        
        if (this.state.loading) {
            timeElement = <Spinner />;
        }

        return (
            <div className='Timeline'>
                <h3>Timeline</h3>
                <ul className="Timepoint">
                    {timeElement}
                </ul>
            </div>
        );
    }
}

export default Timeline;