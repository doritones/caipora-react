import React from 'react';

import TimeElement from './TimeElement/TimeElement';
import './Timeline.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeline: []
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
                return this.setState({ timeline: timelineArr });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='Timeline'>
                <h3>Timeline</h3>
                <ul className="Timepoint">
                    {this.state.timeline.map(elem => 
                        <TimeElement
                            key={elem.id}
                            date={elem.date}
                            text={elem.text}
                            source={elem.source}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default Timeline;