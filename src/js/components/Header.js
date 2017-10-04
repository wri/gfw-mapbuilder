import Navigation from 'components/Navigation/Navigation';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Header extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    const {labels, hideHeader} = settings;
    let title = '';
    let subtitle = '';


    if (labels) {
      const text = labels[language];
      if (text) {
        title = text.title;
        subtitle = text.subtitle;
      }
    }

    return (
      <div className={`app-header ${hideHeader ? 'hidden' : ''}`}>
        <div className='app-header__logo-container'>
          <a href={settings.logoLinkUrl} target='_blank'>
            <img className='app-header__logo' src={settings.logoUrl} />
          </a>
        </div>
        <div className='app-header__title-container'>
          <div title={title} className='app-header__title'>{title}</div>
          <div title={subtitle} className='app-header__subtitle'>{subtitle}</div>
        </div>
        <Navigation />
      </div>
    );
  }
}
