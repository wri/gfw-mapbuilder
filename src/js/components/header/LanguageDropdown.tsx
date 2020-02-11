import React, { FunctionComponent } from 'react';
import { mapController } from 'js/controllers/mapController';

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
  return (
    <div className="language-dropdown-container">
      <select
        value={props.selectedLanguage}
        onChange={e => mapController.changeLanguage(e.target.value)}
      >
        <option value={props.language}>{valueToLang(props.language)}</option>
        <option value={props.alternativeLanguage}>
          {valueToLang(props.alternativeLanguage)}
        </option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
