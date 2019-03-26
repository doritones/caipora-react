import React from 'react';

import TimeElement from '../../components/TimeElement/TimeElement';
import Spinner from '../../components/UI/Spinner/Spinner';
import DropdownButton from '../../components/UI/DropdownButton/DropdownButton';
import './Timeline.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.listTags = this.listTags.bind(this);
        this.listSort = this.listSort.bind(this);
        this.filterTags = this.filterTags.bind(this);
        this.cleanFilter = this.cleanFilter.bind(this);
        this.state = {
            timeline: [],
            timelineBackup: [],
            tags: [],
            tagsFilter: null,
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
                        source: record.fields['Canal'],
                        tags: record.fields['Tag']
                    };
                    timelineArr.push(timelineItem);
                });
                return this.setState({ timeline: timelineArr, timelineBackup: timelineArr, loading: false });
            })
            .then(this.listTags)
            .catch(err => console.log(err));
    }

    listTags () {
        // It's called when component mount, in the last fetch promise, to populate 'tags' state
        const tags = [...this.state.timeline];
        let tagElem = tags.map(elem => elem.tags).flat();
        let uniqueTags = [...new Set(tagElem)];
        this.setState({ tags: uniqueTags })
    }

    listSort (e) {
        // Just reversing order, because it comes in correct chronological order from Airtable
        const sortList = this.state.timeline;
        let resortedList = sortList.reverse();
        this.setState({ timeline: resortedList });
    }

    filterTags (e) {
        const tagList = [...this.state.timeline];
        // eslint-disable-next-line
        let filteredTags = tagList.filter(item => item.tags == e);
        this.setState({ timeline: filteredTags, tagsFilter: e })
    }

    cleanFilter (e) {
        // Using a timeline backup on state until better solution (maybe refetch the data, creating a function outside componentDidMount)
        this.setState({ timeline: this.state.timelineBackup, tagsFilter: null })
    }

    render() {
        let timeElement = this.state.timeline.map(elem => 
            <TimeElement
                key={elem.id}
                date={elem.date}
                text={elem.text}
                source={elem.source}
                tags={elem.tags}
            />
        )
        
        if (this.state.loading) {
            timeElement = <Spinner />;
        }

        return (
            <div className='Timeline'>
                <h3>Timeline</h3>
                <div className='Filters'>
                {/* Buttons on this section should be reusable, created on components folder */}
                    {this.state.tagsFilter ? 
                        <button className='ButtonTag' onClick={this.cleanFilter}>{this.state.tagsFilter} <i className="fas fa-times-circle"></i></button> 
                        : <DropdownButton text='Filter by Tag' items={this.state.tags} filter={this.filterTags} /> }
                    <button className="ButtonSort" onClick={this.listSort}>Invert order</button>
                </div>
                <ul className="Timepoint">
                    {timeElement}
                </ul>
            </div>
        );
    }
}

export default Timeline;