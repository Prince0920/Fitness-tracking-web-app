const StravaStrategy = require('passport-strava').Strategy;
const { SERVER_URL } = require('../config/CONSTANT');
const Strava = require('../models/Strava');

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

function initializeStrava(passport) {
  passport.use(
    new StravaStrategy(
      {
        clientID: STRAVA_CLIENT_ID,
        clientSecret: STRAVA_CLIENT_SECRET,
        callbackURL: `${SERVER_URL}/api/strava/auth/strava/callback`,
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
