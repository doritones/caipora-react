import React from 'react';
import axios from 'axios';

import TimeElement from '../../components/TimeElement/TimeElement';
import Spinner from '../../components/UI/Spinner/Spinner';
import DropdownButton from '../../components/UI/DropdownButton/DropdownButton';
import './Timeline.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveData = this.retrieveData.bind(this);
        this.listTags = this.listTags.bind(this);
        this.listMonths = this.listMonths.bind(this);
        this.listSort = this.listSort.bind(this);
        this.filterTags = this.filterTags.bind(this);
        this.filterMonths = this.filterMonths.bind(this);
        this.cleanTagsFilter = this.cleanTagsFilter.bind(this);
        this.cleanMonthsFilter = this.cleanMonthsFilter.bind(this);
        this.state = {
            timeline: [],
            tags: [],
            months: [],
            tagsFilter: null,
            monthsFilter: null,
            loading: true
        }
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData () {
        axios.get('/api/timeline')
            .then(res => {
                let timelineArr = [];
                res.data.forEach(record =>  {
                    let timelineItem = {
                        id: record._id,
                        date: record.date_of_the_news,
                        text: record.text_of_timeline,
                        source: record.source,
                        tags: record.tags
                    };
                    timelineArr.push(timelineItem);
                });
                return this.setState({ timeline: timelineArr, loading: false });
            })
            .then(this.listTags)
            .then(this.listMonths)
            .catch(err => console.log(err));
    }

    listTags () {
        // It's called when component mount, in the last fetch promise, to populate 'tags' state
        const tags = [...this.state.timeline];
        let tagElem = tags.map(elem => elem.tags).flat();
        let uniqueTags = [...new Set(tagElem)];
        this.setState({ tags: uniqueTags })
    }

    listMonths () {
        // It's called when component mount, in the last fetch promise, to populate 'months' state
        const months = [...this.state.timeline];
        let monthElem = months.map(elem => new Intl.DateTimeFormat('pt-BR', { month: 'long'}).format(new Date(elem.date)));
        let uniqueMonths = [...new Set(monthElem)];
        this.setState({ months: uniqueMonths })
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

    filterMonths (e) {
        const monthList = [...this.state.timeline];
        // eslint-disable-next-line
        let filteredMonths = monthList.filter(item => new Intl.DateTimeFormat('pt-BR', { month: 'long'}).format(new Date(item.date)) === e);
        this.setState({ timeline: filteredMonths, monthsFilter: e })
    }

    cleanTagsFilter (e) {
        this.setState({ loading: true });
        this.retrieveData();
        this.setState({ tagsFilter: null });
    }

    cleanMonthsFilter (e) {
        this.setState({ loading: true });
        this.retrieveData();
        this.setState({ monthsFilter: null });
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
                    <div className='LeftButtons'>
                        {this.state.monthsFilter ? 
                            <button className='ButtonTag' onClick={this.cleanMonthsFilter}>{this.state.monthsFilter} <i className="fas fa-times-circle"></i></button> 
                            : <DropdownButton text='Filter by Month' items={this.state.months} filter={this.filterMonths} /> }
                        {this.state.tagsFilter ? 
                            <button className='ButtonTag' onClick={this.cleanTagsFilter}>{this.state.tagsFilter} <i className="fas fa-times-circle"></i></button> 
                            : <DropdownButton text='Filter by Tag' items={this.state.tags} filter={this.filterTags} /> }
                    </div>
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