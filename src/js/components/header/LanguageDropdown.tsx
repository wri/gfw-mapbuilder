import React, { FunctionComponent } from 'react';

export const LanguageDropdown: FunctionComponent = () => {
  return (
    <div className="language-dropdown-container">
      <select>
        <option value="option-1">English</option>
        <option value="option-2">Spanish</option>
      </select>
    </div>
  );
};
