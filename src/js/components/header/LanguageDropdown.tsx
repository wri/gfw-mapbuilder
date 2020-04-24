import React from 'react';

import { mapController } from 'js/controllers/mapController';

import { ReactComponent as InfoBoxIcon } from 'src/images/infoBoxIcon.svg';

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

const config = {
  en: 'SELECT LANGUAGE',
  es: 'Seleccionar idioma',
  fr: 'Choisir Langue',
  pt: 'Selecionar Idioma',
  id: 'Select Language',
  ka: 'ენის არჩევა',
  zh: '选择语言'
};

const LanguageDropdown = (props: DropProps) => {
  return (
    <div className="language-dropdown-container">
      <ul className="dropdown">
        <span className="label-wrapper">
          <InfoBoxIcon height={16} width={16} fill={'#555'} />
          <li className="dropdown-label">{config[props.selectedLanguage]}</li>
        </span>
        <ul className="options">
          <li
            role="button"
            aria-labelledby="dropdown-label"
            id="dropdown__selected"
            tabIndex={0}
            onClick={(): void => mapController.changeLanguage(props.language)}
            className={
              props.selectedLanguage === props.language ? 'selected' : ''
            }
          >
            {valueToLang(props.language)}
          </li>
          <li
            role="button"
            aria-labelledby="dropdown-label"
            id="dropdown__selected"
            tabIndex={0}
            onClick={(): void =>
              mapController.changeLanguage(props.alternativeLanguage)
            }
            className={
              props.selectedLanguage === props.alternativeLanguage
                ? 'selected'
                : ''
            }
          >
            {valueToLang(props.alternativeLanguage)}
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default LanguageDropdown;
