import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.airtable.com/v0/appGU1IvnOZqFFiCh/Table%201?view=Grid%20view',
    headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_API_KEY }
});