const mongoose = require('mongoose');

// Define the schema for the VoiceTypeNames collection
const voiceTypeNamesSchema = new mongoose.Schema({
  languageCode: {
    type: String,
    required: true,
  },
  languageName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  voiceType: {
    type: String,
    required: true,
  },
  voiceNames: {
    type: Array,
    required: true,
  },
});

// Create the VoiceTypeNames model
const VoiceTypeNames = mongoose.model('VoiceTypeNames', voiceTypeNamesSchema);
module.exports = VoiceTypeNames;
