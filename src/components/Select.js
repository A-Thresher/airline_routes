import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  return (
    <select onChange={onSelect} value={value}>
      <option value="all">{allTitle}</option>
      {options.map((o, i) => {
        return (
          <option key={i} value={o[valueKey]}
                  disabled={o.disable}>
            {o[titleKey]}
          </option>
        );
      })}
    </select>
  )
};

export default Select;
