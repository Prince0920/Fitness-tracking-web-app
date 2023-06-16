const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const CLIENT_ID = '23QXZ7';
const CLIENT_SECRET = '77738a0baac5343826e2020497132cc1';

function initializeFitbit(passport) {
  passport.use(
    new FitbitStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scope: ['activity', 'heartrate', 'location', 'profile'],
        callbackURL: 'http://localhost:3001/api/fitbit/auth/fitbit/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // TODO: save accessToken here for later use

        done(null, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
}

module.exports = initializeFitbit;
