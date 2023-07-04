const router = require('express').Router();
const {
  speachText,
  getAvailableLanguages,
  getAvailableVoiceTypes,
  getAvailableVoiceName,
  saveAilableVoiceCustomeName,
  getAvailableAudioDevice,
} = require('../../../controllers/tts/tts-controller');

/* Google text to spech route start */
// /api/tts/tts
router.post('/generate', speachText);
// /api/tts/get-available-languages
router.get('/get-available-languages', getAvailableLanguages);
// /api/tts/get-available-voice-types
router.get('/get-available-voice-types', getAvailableVoiceTypes);
// /api/tts/get-available-voice-name
router.get('/get-available-voice-name', getAvailableVoiceName);
// /api/tts/save-available-voice-custome-name
router.post('/save-available-voice-custome-name', saveAilableVoiceCustomeName);
// /api/tts/save-audio-device-drofile
router.post('/save-audio-device-drofile', saveAilableVoiceCustomeName);
// /api/tts/get-available-audio-device
router.get('/get-available-audio-device', getAvailableAudioDevice);
/* Google text to spech route end */

module.exports = router;
