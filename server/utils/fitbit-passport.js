const Fitbit = require('../models/Fitbit');

const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;

function initializeFitbit(passport) {
  passport.use(
    new FitbitStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scope: ['activity', 'heartrate', 'location', 'profile'],
        callbackURL: 'http://localhost:3001/api/fitbit/auth/fitbit/callback',
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
        const fitbit_data = await Fitbit.findOneAndUpdate({ profileId: profile.id }, bodyData, {
          new: true,
          upsert: true,
        });
        done(null, fitbit_data);
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

module.exports = initializeFitbit;
