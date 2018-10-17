import appActions from 'actions/AppActions';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';

import React, {
  Component,
  PropTypes
} from 'react';

export default class LanguageToggle extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  // label for the language is in the format text.en.LANG_EN or text.en.LANG_ZH
  createListButton = (currentLanguage, language) => {
    return (
      <li
        key={language}
        className={`app-header__language pointer ${currentLanguage === language ? 'active' : ''}`}
        onClick={this.toggleLanguage}
        data-lang={language}>
        {text[language][`LANG_${language.toUpperCase()}`]}
      </li>
    );
  };

  toggleLanguage = (evt) => {
    const {target} = evt;
    const lang = target.getAttribute('data-lang');
    if (lang) {
      appActions.setLanguage(lang);
    }
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    const languageButtons = [];
    for (const lang in settings.labels) {
      languageButtons.push(this.createListButton(language, lang));
    }

    return (
      <li className='app-header__nav-link app-header__nav-link--language pointer'>
        <svg className='svg-icon__nav'>
          <SVGIcon id={'icon-h-language'} />
        </svg>
        {text[language].NAV_LANGUAGE}
        <ul className='app-header__language-list shadow pointer'>
          {languageButtons}
        </ul>
      </li>
    );
  }

}
