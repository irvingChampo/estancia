import React from 'react';

const InputField = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}  // Asegúrate de que el atributo `name` esté presente
      className="input-field"
    />
  );
};

export default InputField;

