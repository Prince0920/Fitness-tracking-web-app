import React, { useEffect, useState } from 'react';
import './Sample.css';
import Layout from './components/common/Layout';

const Sample = () => {
  const [state, setState] = useState({
    text: '',
    selectedLanguage: '',
    selectedVoiceType: '',
    selectedVoiceName: '',
    selectedAudioDeviceProfile: '',
    speed: 1,
    pitch: 1,
  });

  const [dropDownState, setDropDownState] = useState({
    languages: [],
    voiceTypes: [],
    voiceNames: [],
    audioDevices: [],
  });

  const handleChange = event => {
    const { name, value, type } = event.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    setState(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  console.log('state', state);
  const getAvaliableLanguage = () => {
    const url = '/api/get-available-languages';
    return {
      languages: [
        {
          code: 'es-US',
          name: 'Spanish (US)',
        },
      ],
    };
  };

  const getAvaliableVoiceType = () => {
    const url = `/api/get-available-voice-types?language=${state?.selectedLanguage}`;
    return {
      voiceTypes: [
        {
          code: 'Standard',
          name: 'Standard',
        },
      ],
    };
  };

  const getAvaliableVoiceName = () => {
    const url = `/api/get-available-voice-name?language=${state.selectedLanguage}&voiceType=${state.selectedVoiceType}`;
    return {
      voiceNames: [
        {
          code: 'ja-JP-Standard-A',
          name: 'A-FEMALE',
        },
      ],
    };
  };

  const getActivityAudioDevice = () => {
    const url = `/api/get-available-audio-device`;
    return {
      audioDevices: [
        {
          name: 'Default',
          code: 'default',
        },
      ],
    };
  };
  console.log('dropDownState', dropDownState);
  useEffect(() => {
    const fetch = async () => {
      const languagesResp = await getAvaliableLanguage();
      setDropDownState(prev => ({
        ...prev,
        languages: languagesResp.languages,
      }));

      const audioDeviceResp = await getActivityAudioDevice();
      setDropDownState(prev => ({
        ...prev,
        audioDevices: audioDeviceResp.audioDevices,
      }));
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const voiceTypeResp = await getAvaliableVoiceType();
      setDropDownState(prev => ({
        ...prev,
        voiceTypes: voiceTypeResp.voiceTypes,
        voiceNames: [],
      }));
    };

    if (state.selectedLanguage) fetch();
  }, [state.selectedLanguage]);

  useEffect(() => {
    const fetch = async () => {
      const voiceNameResp = await getAvaliableVoiceName();
      setDropDownState(prev => ({
        ...prev,
        voiceNames: voiceNameResp.voiceNames,
      }));
    };

    if (state.selectedVoiceType) fetch();
  }, [state.selectedVoiceType]);

  const handleTextToSpeech = () => {
    // Perform text-to-speech action with the selected values
    console.log('Text to Speech:', state.text);
    console.log('Selected Language:', state.selectedLanguage);
    console.log('Selected Voice Type:', state.selectedVoiceType);
    console.log('Selected Voice Name:', state.selectedVoiceName);
    console.log('Selected Audio Device Profile:', state.selectedAudioDeviceProfile);
    console.log('Speed:', state.speed);
    console.log('Pitch:', state.pitch);
  };

  return (
    <div className='content-wrapper ttl-content-wrapper'>
      <Layout
        heading='Fitbit Dashboard'
        item='fitbit'
      />
      <section className='content ttl-content'>
        <div className='container-fluid ttl-container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <label htmlFor='language'>Input:</label>
              <input
                type='text'
                name='text'
                value={state.text}
                onChange={handleChange}
                className='ttl-input'
              />
            </div>
          </div>
          <div className='row ttl-margin-top'>
            <div className='col-4'>
              <label htmlFor='language'>Language:</label>
              <select
                id='language'
                name='selectedLanguage'
                value={state.selectedLanguage}
                onChange={handleChange}
                className='ttl-select'>
                <option value=''>Select Language</option>
                {dropDownState.languages.length > 0 &&
                  dropDownState.languages.map(language => (
                    <option value={language.code}>{language.name}</option>
                  ))}
              </select>
            </div>
            <div className='col-4'>
              <label htmlFor='voiceType'>Voice Type:</label>
              <select
                id='voiceType'
                name='selectedVoiceType'
                value={state.selectedVoiceType}
                onChange={handleChange}
                className='ttl-select'>
                <option value=''>Select Voice Type</option>
                {dropDownState.voiceTypes.length > 0 &&
                  dropDownState.voiceTypes.map(voiceType => (
                    <option value={voiceType.code}>{voiceType.name}</option>
                  ))}
              </select>
            </div>
            <div className='col-4'>
              <label htmlFor='voiceName'>Voice Name:</label>
              <select
                id='voiceName'
                name='selectedVoiceName'
                value={state.selectedVoiceName}
                onChange={handleChange}
                className='ttl-select'>
                <option value=''>Select Voice Name</option>
                {dropDownState.voiceNames.length > 0 &&
                  dropDownState.voiceNames.map(voiceName => (
                    <option value={voiceName.code}>{voiceName.name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className='row ttl-margin-top'>
            <div className='col-4'>
              <label htmlFor='audioDeviceProfile'>Audio Device Profile:</label>
              <select
                id='audioDeviceProfile'
                name='selectedAudioDeviceProfile'
                value={state.selectedAudioDeviceProfile}
                onChange={handleChange}
                className='ttl-select'>
                <option value=''>Select Audio Device Profile</option>
                {dropDownState.audioDevices.length > 0 &&
                  dropDownState.audioDevices.map(audioDevice => (
                    <option value={audioDevice.code}>{audioDevice.name}</option>
                  ))}
              </select>
            </div>
            <div className='col-4'>
              <label htmlFor='speed'>Speed:</label>
              <input
                type='range'
                id='speed'
                name='speed'
                min='0.5'
                max='2'
                step='0.1'
                value={state.speed}
                onChange={handleChange}
                className='ttl-range-input'
              />
              <span>{state.speed}</span>
            </div>
            <div className='col-4'>
              <label htmlFor='pitch'>Pitch:</label>
              <input
                type='range'
                id='pitch'
                name='pitch'
                min='0.5'
                max='2'
                step='0.1'
                value={state.pitch}
                onChange={handleChange}
                className='ttl-range-input'
              />
              <span>{state.pitch}</span>
            </div>
          </div>
          <div className='row ttl-margin-top'>
            <div className='col-12'>
              <button
                onClick={handleTextToSpeech}
                className='ttl-convert-button'>
                Convert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sample;
