import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { setLanguage } from 'js/store/appState/actions';

interface DropProps {
  language: string;
  alternativeLanguage: string;
  selectedLanguage: string;
}

function valueToLang(abbrev: string): string {
  let lang = '';

  switch (abbrev) {
    case 'en':
      lang = 'English';
      break;
    case 'es':
      lang = 'Spanish';
      break;
    case 'fr':
      lang = 'French';
      break;
    case 'pt':
      lang = 'Portuguese';
      break;
    case 'id':
      lang = 'Indonesian';
      break;
    case 'ka':
      lang = 'Georgian';
      break;
    case 'zh':
      lang = 'Chinese';
      break;
    default:
      break;
  }

  return lang;
}

const LanguageDropdown = (props: DropProps) => {
  const dispatch = useDispatch();

  return (
    <div className="language-dropdown-container">
      <select
        value={props.selectedLanguage}
        onChange={e => dispatch(setLanguage(e.target.value))}
      >
        <option value={props.language}>
          {valueToLang(props.selectedLanguage)}
        </option>
        <option value={props.alternativeLanguage}>
          {valueToLang(props.alternativeLanguage)}
        </option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
