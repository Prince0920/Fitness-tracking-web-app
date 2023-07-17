// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');
const AppleUser = require('../../../models/Apple/Apple');

module.exports = {
  // Admin apple login
  async loginAppleWatch(req, res) {
    try {
      const { query } = req;
      console.log('loginAppleWatch query data', query);
      const appleUser = await AppleUser.findOne({ email: query.email });
      if (!appleUser) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await appleUser.isCorrectPassword(query.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      res.json({ appleUser });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Apple admin signup
  async registerAppleWatch(req, res) {
    try {
      console.log('registerAppleWatch body data', req.body);
      console.log('registerAppleWatch query data', req.query);

      const appleUser = await AppleUser.create(req.body);
      res.json({ status: 200, message: 'Register success' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log('I am in validation: ', JSON.stringify(error));
        // Handle validation errors
        const validationErrors = {};
        for (let key in error.errors) {
          validationErrors[key] = error.errors[key].message;
        }
        // console.log('Validation errors:', Object.values(validationErrors)[0]);
        return res.status(400).json({ message: Object.values(validationErrors)[0] });
      } else if (error.name === 'MongoServerError' && error.code === 11000) {
        // Handle duplicate email error
        console.log('I am in MongoServerError: ', JSON.stringify(error));
        let errorMessage = 'Email address already exists!';

        if (error.keyPattern.appleId) {
          errorMessage = 'Apple Id already exist!';
        }
        return res.status(400).json({ message: errorMessage });
      } else {
        // Handle other types of errors
        console.error('Error:', error.name);
        return res.status(500).json({ error });
      }
    }
  },
  // Testing apple routing
  activityData(req, res) {
    try {
      console.log('activity body data', req.body);
      res.json({ message: 'activityData: ' + req.body.activityData });
    } catch (error) {
      console.log('error in activityData apple', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
