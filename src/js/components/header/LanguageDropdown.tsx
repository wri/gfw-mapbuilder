import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { setLanguage } from '../../store/appState/actions';

const LanguageDropdown: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className="language-dropdown-container">
      <select
        onChange={e =>
          dispatch(setLanguage({ selectedLanguage: e.target.value }))
        }
      >
        <option value="en">English</option>
        <option value="ka">Georgian</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="pt">Portuguese</option>
        <option value="id">English2.0</option>
        <option value="zh">Chinese</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
