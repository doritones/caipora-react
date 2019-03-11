import React from 'react';

import TimeElement from './TimeElement/TimeElement';

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
                data.records.map(record =>  {
                    return this.setState({
                        timeline: [{
                            id: record.id,
                            date: record.fields['Publicado'],
                            text: record.fields['Texto'],
                            source: record.fields['Canal']
                        }]
                    })
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.timeline);
        return (
            <div className='Timeline'>
                <h3>Timeline</h3>
                <ul className="Timepoint">
                    {this.state.timeline.map(elem =>
                        <TimeElement
                            key={elem.key}
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