// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');
const passport = require('passport');

module.exports = {
  // Testing fitbit routing
  sampleStrava(req, res) {
    try {
      res.json({ message: 'Strava Api setup successfully!' + JSON.stringify(req.user) });
    } catch (error) {
      console.log('error in sampleStrava', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Strava authentication success
  async authSuccess(req, res) {
    try {
      res.redirect(`http://localhost:3001`);
    } catch (error) {
      console.error('Error in authSuccess:', error);
      return res.status(500).json('Something went wrong!');
    }
  },

  // Strava authentication failed
  authFailed({ body }, res) {
    try {
      res.json({ message: 'Authentication failed with Strava!' });
    } catch (error) {
      console.error('Error in authFailed:', error);
      return res.status(500).json('Something went wrong!');
    }
  },
};
