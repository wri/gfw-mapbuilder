import appActions from 'actions/AppActions';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Navigation extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  renderMapThemes = (language, settings) => {
    const shouldRender = settings.labels &&
                       settings.labels[language] &&
                       settings.labels[language].themes !== undefined;

    if (shouldRender) {
      return settings.labels[language].themes.map((theme, counter) => {
        return (
          <li key={counter} className='mobile-menu__nav-link pointer'>
            <a target={settings.navLinksInNewTab ? '_blank' : '_self'} href={theme.url}>{theme.label}</a>
          </li>
        );
      });
    } else {
      return undefined;
    }
  };

  renderLanguageButtons = (currentLanguage, settings) => {
    if (settings.useAlternativeLanguage) {
      return Object.keys(settings.labels).map((language) => {
        return (
          <li
            key={language}
            className={`mobile-menu__nav-link pointer ${currentLanguage === language ? 'active' : ''}`}
            data-lang={language}
            onClick={this.toggleLanguage}>
            {text[currentLanguage][`LANG_${language.toUpperCase()}`]}
          </li>
        );
      });
    } else {
      return undefined;
    }
  };

  toggleLanguage = ({target}) => {
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

    const LanguageComponent = this.renderLanguageButtons(language, settings);
    const ThemeComponent = this.renderMapThemes(language, settings);
    const target = settings.navLinksInNewTab ? '_blank' : '_self';

    return (
      <nav className='mobile-menu__nav'>
        <ul className='mobile-menu__nav-list'>
          <li className='mobile-menu__nav-link pointer'>
            <a target={target} href={settings.aboutLinkUrl}>
              {text[language].NAV_ABOUT}
            </a>
          </li>
          <li className='mobile-menu__nav-link pointer'>
            <a target={target} href={settings.downloadLinkUrl}>
              {text[language].NAV_DOWNLOAD}
            </a>
          </li>
          {!settings.includeMyGFWLogin ? null :
            <li className='mobile-menu__nav-link pointer'>
              <a target={target}>
                {text[language].NAV_MY_GFW}
              </a>
            </li>
          }
          {ThemeComponent}
          {LanguageComponent}
        </ul>
      </nav>
    );
  }
}
