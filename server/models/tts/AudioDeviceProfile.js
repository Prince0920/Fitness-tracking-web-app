const mongoose = require('mongoose');

const audioDeviceProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const AudioDeviceProfile = mongoose.model('AudioDeviceProfile', audioDeviceProfileSchema);

module.exports = AudioDeviceProfile;
