const { Schema, model } = require('mongoose');

const FitbitSchema = new Schema({
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
  isSync: {
    type: Boolean,
    default: false,
  },
});

const Fitbit = model('Fitbit', FitbitSchema);

module.exports = Fitbit;
