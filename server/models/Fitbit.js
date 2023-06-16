const { Schema, model } = require('mongoose');

const FitbitSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

const Fitbit = model('Fitbit', FitbitSchema);

module.exports = Fitbit;
