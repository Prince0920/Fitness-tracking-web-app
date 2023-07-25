const Strava = require('../../../models/Strava');

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
      res.redirect(`http://localhost:3132/admin/strava/dashboard`);
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
  // Checking if user already login
  async isLogin(req, res) {
    try {
      const { user } = req;
      const stravaData = await Strava.findOne({ userId: user._id });
      if (!stravaData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      return res.json({
        profileId: stravaData.profileId,
        provider: 'strava',
        displayName: stravaData.profile.displayName,
      });
    } catch (error) {
      console.error('Error in isLogin:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  async disconnect(req, res) {
    try {
      const { user } = req;
      const stravaData = await Strava.deleteOne({ userId: user._id });
      if (!stravaData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      return res.json(stravaData);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
