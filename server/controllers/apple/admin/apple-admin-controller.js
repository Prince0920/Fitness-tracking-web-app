// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = {
  // Testing fitbit routing
  activityData(req, res) {
    try {
      console.log('activity body data', req.body)
      res.json({ message: 'activityData: '+  req.body.activityData});
    } catch (error) {
      console.log('error in activityData apple', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
