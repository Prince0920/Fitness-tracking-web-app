// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');
const validator = require('validator');

module.exports = {
  // Admin apple login
  loginAppleWatch(req, res) {
    try {
      console.log('loginAppleWatch body data', req.body);
      console.log('loginAppleWatch query data', req.query);

      const { email } = req.query;

      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ status: 400, message: 'Invalid email address' });
      }

      res.json({ status: 200, message: 'Login success' });
    } catch (error) {
      console.log('error in loginAppleWatch', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Apple admin signup
  registerAppleWatch(req, res) {
    try {
      console.log('registerAppleWatch body data', req.body);
      console.log('registerAppleWatch query data', req.query);

      const { email } = req.body;

      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ status: 400, message: 'Invalid email address' });
      }

      // Continue with the registration logic

      res.json({ status: 200, message: 'Register success' });
    } catch (error) {
      console.log('error in registerAppleWatch apple', error);
      return res.status(500).json({ message: 'Something went wrong!' });
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
