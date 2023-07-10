const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const db = require('./config/connection');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const initializeFitbit = require('./utils/fitbit-passport');
const initializeStrava = require('./utils/strava-passport');

initializeFitbit(passport);
initializeStrava(passport);
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
