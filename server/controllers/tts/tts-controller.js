const mongoose = require('mongoose');
const VoiceTypeNames = require('../../models/tts/VoiceTypeNames.js');
const AudioDeviceProfile = require('../../models/tts/AudioDeviceProfile');
const GeneratedSpeechText = require('../../models/tts/GeneratedSpeechText');
const ObjectId = mongoose.Types.ObjectId;
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');
const util = require('util'); // Add this line
const writeFileAsync = util.promisify(fs.writeFile);
const loudness = require('loudness');
const languageCodeMapping = require('../../utils/tts/languageCodeMapping.js');

// Path to your JSON key file
const keyFilePath = 'controllers/tts/tts-keys.json';

module.exports = {
  speachText: async (req, res, next) => {
    try {
      console.log("Starting of speech to text API_____________________________")
      const { audioDevice, inputText, pitch, selectedLanguage, speed, voiceName, voiceType } =
        req.body;

      // Create a client instance with the JSON key file
      const client = new textToSpeech.TextToSpeechClient({
        keyFilename: keyFilePath,
      });

      // Configure the speech request
      const request = {
        audioConfig: {
          audioEncoding: 'LINEAR16',
          pitch: pitch,
          speakingRate: speed,
        },
        input: {
          text: inputText,
        },
        voice: {
          languageCode: selectedLanguage,
          name: voiceName,
        },
      };

      if (audioDevice !== 'default') {
        request.audioConfig.effectsProfileId = [audioDevice];
      }

      // Perform the text-to-speech conversion
      const response = await client.synthesizeSpeech(request);

      // Handle the response
      const audioContent = response[0].audioContent;
      // Save or process the audio content
      const fileName = `output_${Date.now()}.mp3`;
      const filePath = path.resolve(__dirname, '..', '..', 'public', 'voices', fileName);

      // Create the 'public/voices' directory if it doesn't exist
      const voicesDirectory = path.resolve(__dirname, '..', '..', 'public', 'voices');
      if (!fs.existsSync(voicesDirectory)) {
        fs.mkdirSync(voicesDirectory, { recursive: true });
      }

      await writeFileAsync(filePath, audioContent, 'binary');

      console.log(`Audio content written to file: ${filePath}`);

      // Save data to MongoDB
      const charactersCount = inputText.length;
      const byteCount = Buffer.byteLength(inputText, 'utf8'); // Calculate byte count
      const createdDateTime = new Date();

      const generatedSpeechText = new GeneratedSpeechText({
        inputText: inputText.slice(0, charactersCount),
        charactersCount,
        byteCount,
        audioDevice,
        pitch,
        selectedLanguage,
        speed,
        voiceName,
        voiceType,
        fileName,
        createdDateTime,
      });

      await generatedSpeechText.save();

      // Get the current volume
      loudness.getVolume((err, volume) => {
        if (!err) {
          console.log('Current volume:', volume);
        }
      });

      // Set the volume to a specific value
      loudness.setVolume(50, err => {
        if (!err) {
          console.log('Volume set to 50');
        }
      });
      console.log("Ending of speech to text API_____________________________")
      // Respond with the generated file name
      res.json({ fileName });
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      next(error);
    }
  },

  getAvailableLanguages: async (req, res, next) => {
    try {
      // Create a client instance
      const client = new textToSpeech.TextToSpeechClient({
        keyFilename: keyFilePath,
      });

      // Retrieve the list of available languages
      const [response] = await client.listVoices({});
      const voices = response.voices;

      // Extract the language codes from the response
      const languageCodes = voices.map(voice => voice.languageCodes[0]);

      // Filter out duplicate language codes
      const uniqueLanguageCodes = [...new Set(languageCodes)];

      // Map the unique language codes to their full country names using languageCodeMapping
      const languages = uniqueLanguageCodes.map(code => ({
        code,
        name: languageCodeMapping[code] || code,
      }));

      // Return the languages as the response
      res.json({ languages });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getAvailableVoiceTypes: async (req, res, next) => {
    try {
      // Get the selected language from the request
      const selectedLanguage = req.query.language;

      // Create a client instance
      const client = new textToSpeech.TextToSpeechClient({
        keyFilename: keyFilePath,
      });

      // Retrieve the list of available voices
      const [response] = await client.listVoices({});

      // Filter the voices based on the selected language
      const filteredVoices = response.voices.filter(voice =>
        voice.languageCodes.includes(selectedLanguage)
      );

      // Extract unique voice types from the filtered voices
      const voiceTypesSet = new Set();
      filteredVoices.forEach(voice => {
        const voiceName = voice.name;
        const voiceTypeMatch = voiceName.match(/-([A-Za-z0-9]+)-[A-Za-z]+$/);
        if (voiceTypeMatch) {
          const voiceType = voiceTypeMatch[1];
          voiceTypesSet.add(voiceType);
        }
      });

      // Map the voice types to include code and name properties
      const mappedVoiceTypes = Array.from(voiceTypesSet).map(voiceType => ({
        code: voiceType,
        name: voiceType,
      }));

      // Return the voice types as the response
      res.json({ voiceTypes: mappedVoiceTypes });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getAvailableVoiceName: async (req, res, next) => {
    try {
      // Get the selected language and voice type from the request
      const selectedLanguage = req.query.language;
      const selectedVoiceType = req.query.voiceType;

      // Create a client instance
      const client = new textToSpeech.TextToSpeechClient({
        keyFilename: keyFilePath,
      });

      // Retrieve the list of available voices
      const [response] = await client.listVoices({});

      // Filter the voices based on the selected language and voice type
      const filteredVoices = response.voices.filter(
        voice =>
          voice.languageCodes.includes(selectedLanguage) && voice.name.includes(selectedVoiceType)
      );

      // Retrieve the voiceTypeNames document from the database
      let voiceTypeNames = await VoiceTypeNames.findOne({
        languageCode: selectedLanguage,
        voiceType: selectedVoiceType,
      });

      // If no specific language and voice type match is found, fallback to the default
      if (!voiceTypeNames) {
        const defaultVoiceTypeNames = await VoiceTypeNames.findOne({
          languageCode: 'default',
          voiceType: 'Default',
        });

        // Use the default voiceTypeNames if available
        if (defaultVoiceTypeNames) {
          voiceTypeNames = defaultVoiceTypeNames;
        }
      }

      // Map the filtered voices to include the voice type names
      const mappedVoices = filteredVoices.map(voice => {
        const languageCode = voice.languageCodes[0];
        const voiceCode = voice.name.slice(voice.name.lastIndexOf('-') + 1);
        const ssmlGender = voice.ssmlGender === 'FEMALE' ? 'FEMALE' : 'MALE';

        let customName = voiceCode; // Default to voiceCode if custom name not found

        // Check if voiceTypeNames and voiceNames are defined and have the expected structure
        if (voiceTypeNames && voiceTypeNames.voiceNames && voiceTypeNames.voiceNames.length > 0) {
          const voiceNames = voiceTypeNames.voiceNames[0];
          const genderNames = voiceNames[ssmlGender];
          if (genderNames && genderNames[voiceCode]) {
            customName = genderNames[voiceCode];
          }
        }

        const voiceTypeName = `${customName}-${ssmlGender}`;

        return {
          code: voice.name,
          name: voiceTypeName,
        };
      });

      // Return the available voice names as the response
      res.json({ voiceNames: mappedVoices });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  getAvailableAudioDevice: async (req, res, next) => {
    try {
      const audioDeviceProfiles = await AudioDeviceProfile.find();
      const audioDevicesList = audioDeviceProfiles.map(profile => ({
        name: profile.name,
        code: profile.code,
      }));
      res.status(200).json({ audioDevices: audioDevicesList });
    } catch (error) {
      next(error);
    }
  },

  saveAilableVoiceCustomeName: async (req, res, next) => {
    try {
      // Get the data from the request body
      const { languageCode, languageName, countryName, voiceNames, voiceType } = req.body;

      // Create a new instance of the VoiceTypeNames model
      const voiceTypeNames = new VoiceTypeNames({
        languageCode,
        languageName,
        countryName,
        voiceNames,
        voiceType,
      });

      // Save the voiceTypeNames document to the database
      await voiceTypeNames.save();

      res.status(200).json({ message: 'VoiceTypeNames saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  saveAudioDeviceProfile: async (req, res, next) => {
    try {
      const { profiles } = req.body;

      // Create an array of audio device profiles
      const audioDeviceProfiles = profiles.map(profile => ({
        name: profile.name,
        code: profile.code,
      }));

      // Save the audio device profiles to MongoDB
      await AudioDeviceProfile.insertMany(audioDeviceProfiles);

      res.json({ message: 'Audio device profiles saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};
