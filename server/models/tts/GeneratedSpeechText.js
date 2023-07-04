const mongoose = require('mongoose');

const generatedSpeechTextSchema = new mongoose.Schema({
  inputText: {
    type: String,
    required: true,
  },
  charactersCount: {
    type: Number,
    required: true,
  },
  audioDevice: {
    type: String,
    required: true,
  },
  pitch: {
    type: Number,
    required: true,
  },
  selectedLanguage: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  byteCount: {
    type: Number,
    required: true,
  },
  voiceName: {
    type: String,
    required: true,
  },
  voiceType: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
  },
});

const GeneratedSpeechText = mongoose.model('GeneratedSpeechText', generatedSpeechTextSchema);

module.exports = GeneratedSpeechText;
