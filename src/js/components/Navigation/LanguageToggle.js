import appActions from 'actions/AppActions';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';
import mapActions from '../../actions/MapActions';
import tabKeys from '../../constants/TabViewConstants';
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
    const {map, settings} = this.context;
    const narrativeTab = settings.labels && settings.labels[lang] && settings.labels[lang].narrative;
    const {NARRATIVE, LAYERS} = tabKeys;
    
    if (lang) {
      appActions.setLanguage(lang);
      if (narrativeTab) {
        mapActions.changeActiveTab(NARRATIVE);
      } else {
        mapActions.changeActiveTab(LAYERS);
      }
      brApp.map.infoWindow.clearFeatures();
      map.graphics.clear();
      mapActions.setAnalysisType('default');
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
    const { customColorTheme } = this.context.settings;

    return (
      <li className='app-header__nav-link app-header__nav-link--language pointer'>
        <svg className='svg-icon__nav'>
          <SVGIcon id={'icon-h-language'} />
        </svg>
        {text[language].NAV_LANGUAGE}
        <ul style={{borderTop: `3px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}} className='app-header__language-list shadow pointer'>
          {languageButtons}
        </ul>
      </li>
    );
  }

}
