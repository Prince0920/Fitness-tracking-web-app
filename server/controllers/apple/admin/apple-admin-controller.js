// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = {
  // Admin apple login
  loginAppleWatch(req, res) {
    try {
      console.log('loginAppleWatch body data', req.body);
      console.log('loginAppleWatch query data', req.query);
      res.json({ message: 'loginAppleWatch' });
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
      res.json({ message: 'registerAppleWatch' });
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
