const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const dotenv = require('dotenv');
const safeJsonStringify = require('safe-json-stringify');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const cms = require('./cms/cms.js');
const auth = require('./cms/auth.js')

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3030);

app.use(bodyParser.urlencoded({extended: false}));

//Setting Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
  
//Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Authentication
auth(app);

app.get("/api/timeline", (req, res) => {
   axios.get('https://api.airtable.com/v0/appGU1IvnOZqFFiCh/Table%201?view=Grid%20view', 
   { headers: { Authorization: "Bearer " + process.env.AIRTABLE_API_KEY }}).then(response => res.send(safeJsonStringify(response.data)))
});

//Connecting to CMS
cms(app);

app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});