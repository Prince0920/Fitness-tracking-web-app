const { Schema, model } = require('mongoose');

// sample data
// {
//   "user_id": "unique_user_id",
//   "timestamp": "2023-07-20T12:34:56",
//   "data_type": "heart_rate",
//   "data_value": 75,
//   "unit": "bpm",
//   "source": "Fitbit",
//   "additional_metadata": {
//     "average_heart_rate": 80,
//     "max_heart_rate": 120
//   }
// }

const FitnessDataSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  deviceProfileId: {
    type: Schema.Types.String,
    required: true,
  },
  // fitibit, apple ...
  source: {
    type: String,
    required: true,
  },

  timestamp: {
    type: String,
    required: true,
  },

  // Storing date without time stamp
  date: {},

  // steps, calories ...
  data_type: {
    type: String,
    required: true,
  },

  data_value: {
    type: String,
    default: 0,
  },

  unit: {
    type: String,
  },

  additional_metadata: {
    type: Object,
    default: {},
  },
});

const FitnessData = model('FitnessData', FitnessDataSchema);

module.exports = FitnessData;
