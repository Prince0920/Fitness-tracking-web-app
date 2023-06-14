const { Schema, model } = require('mongoose');

const FitbitSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
