const express = require("express");
const axios = require('axios');
const dotenv = require('dotenv');
const safeJsonStringify = require('safe-json-stringify');

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3030);

app.get("/api/timeline", (req, res) => {
   axios.get('https://api.airtable.com/v0/appGU1IvnOZqFFiCh/Table%201?view=Grid%20view', 
   { headers: { Authorization: "Bearer " + process.env.AIRTABLE_API_KEY }}).then(response => res.send(safeJsonStringify(response.data)))
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});