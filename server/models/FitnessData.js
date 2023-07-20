const { Schema, model } = require('mongoose');

const FitnessDataSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    unique: true,
  },
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
