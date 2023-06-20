const jwt = require('jsonwebtoken');
const Fitbit = require('../models/Fitbit');
const axios = require('axios');

const secret = 'mysecretsdontmess';
const expiration = '6h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Middleware to ensure authentication and token refresh
  ensureFitibitAuthenticated: async function (req, res, next) {
    try {
      const { user } = req;
      const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
      const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;

      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(400).json({ message: 'user does not exist!' });
      }

      const { access_token: accessToken, refresh_token: refreshToken } = fitbitData;
      if (accessToken) {
        // Checking if accessToken is expired
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const decodedToken = JSON.parse(
          Buffer.from(accessToken.split('.')[1], 'base64').toString()
        );
        if (decodedToken.exp < currentTime) {
          console.log('fitbit access token invalid');
          // Generating new accessToken using refreshToken
          axios
            .post('https://api.fitbit.com/oauth2/token', null, {
              params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
              },
              headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
                  'base64'
                )}`,
              },
            })
            .then(async response => {
              const body = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
              };
              const updatedData = await Fitbit.findOneAndUpdate(
                { profileId: response.data.user_id },
                body,
                { new: true }
              );
              // accessToken = response.data.access_token;
              // req.user.accessToken = accessToken; // Update the accessToken in user object
              next();
            })
            .catch(error => {
              console.error('Error in ensureFitibitAuthenticated:', error);
              return res.status(500).json({ message: 'Something went wrong!' });
            });
        } else {
          console.log('fitbit access token valid');
          next();
        }
      } else {
        return res.status(500).json({ message: 'Something went wrong!' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
