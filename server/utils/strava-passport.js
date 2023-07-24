const StravaStrategy = require('passport-strava').Strategy;
const Strava = require('../models/Strava');

const STRAVA_CLIENT_ID = '110392';
const STRAVA_CLIENT_SECRET = '4f3e46caa57a320f005fa952daedb0d9cf9b48f9';
// 30bec5bb27e229ae65fdb0a092d53bb2159e8dc6
// 0c7ac619e9cd5856e6a1cc91ce4fb15a3a638aa3

function initializeStrava(passport) {
  passport.use(
    new StravaStrategy(
      {
        clientID: STRAVA_CLIENT_ID,
        clientSecret: STRAVA_CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/api/strava/auth/strava/callback',
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        // TODO: save accessToken here for later use

        const bodyData = {
          userId: req.query.state,
          access_token: accessToken,
          refresh_token: refreshToken,
          profile: profile,
        };
        const strava_data = await Strava.findOneAndUpdate({ profileId: profile.id }, bodyData, {
          new: true,
          upsert: true,
        });
        done(null, strava_data);
      }
    )
  );

  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function (obj, done) {
  //   done(null, obj);
  // });
}

module.exports = initializeStrava;
