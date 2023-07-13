const { Schema, model } = require('mongoose');

const StravaSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profileId: {
    type: String,
    required: true,
    unique: true,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  profile: {
    type: Object,
  },
});

const Strava = model('Strava', StravaSchema);

module.exports = Strava;
