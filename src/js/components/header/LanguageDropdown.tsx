import React, { FunctionComponent } from 'react';

const LanguageDropdown: FunctionComponent = () => {
  return (
    <div className="language-dropdown-container">
      <select>
        <option value="option-1">English</option>
        <option value="option-2">Spanish</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
