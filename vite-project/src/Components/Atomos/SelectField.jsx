import React from 'react';

const SelectField = ({ options, value, onChange, name }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}  // Asegúrate de que el atributo `name` esté presente
      className="select-field"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
