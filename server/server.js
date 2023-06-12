const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const db = require('./config/connection');
const session = require('express-session');
const passport = require('passport');
const { fitbitStrategy } = require('./utils/passport');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(
  passport.session({
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(fitbitStrategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Serve up static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
