const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require("node-cron");
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

// Creating a cron job which runs on every 10 second
// cron.schedule("*/10 * * * * *", function() {
//   console.log("running a task every 10 second");
// });


app.use(routes);

const ip = 'localhost'
// 192.168.6.76
db.once('open', () => {
  app.listen(PORT, ip,() => {
    console.log(`API server running on port http://${ip}:${PORT}!`);
  });
});
