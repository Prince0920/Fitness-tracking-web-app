import React from 'react';

const InputText = ({ label, defaultValue, value, handleInputChange }) => {
  return (
    <>
      <label htmlFor='exampleInputEmail1'>{label}</label>
      <input
        type='text'
        className='form-control'
        name={`${label.toLowerCase()}`}
        placeholder={`Enter ${label}`}
        onChange={handleInputChange}
        defaultValue={defaultValue}
        value={value}
      />
    </>
  );
};

export default InputText;
