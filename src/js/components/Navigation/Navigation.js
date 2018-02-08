import LanguageToggle from 'components/Navigation/LanguageToggle';
import MapThemes from 'components/Navigation/MapThemes';
import mapActions from 'actions/MapActions';
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

  constructor(props) {
    super(props);
    this.state = {
      userSubscriptions: [],
      isLoggedIn: false,
      loginsDisplayed: false,
      optionsDisplayed: false
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {settings} = this.context;

    if (prevContext.settings.includeMyGFWLogin !== settings.includeMyGFWLogin) {
      if (settings.includeMyGFWLogin) {
        this.checkLoggedIn().then(res => {
          if (res) {
            this.setState({
              isLoggedIn: true
            });
            mapActions.toggleLogin(true);
          }
        }, err => {
          console.log('user not logged in', err);
        });
      }
    }
  }

  checkLoggedIn = () => {
    return new Promise((resolve, reject) => {
      fetch(
        'https://production-api.globalforestwatch.org/auth/check-logged',
        {credentials: 'include'}
      ).then(response => {
          let hasError = false;
          if (response.status !== 200) {
            hasError = true;
          }
          response.json().then(json => {
            if (hasError) {
              reject(json);
              return;
            }
            resolve(json);
        });
      });
    });
  }

  renderMapThemes = (language, settings) => {
    const shouldRender = settings.labels &&
                       settings.labels[language] &&
                       settings.labels[language].themes !== undefined;
    const target = settings.navLinksInNewTab ? '_blank' : '_self';

    return shouldRender ? <MapThemes themes={settings.labels[language].themes} target={target} /> : undefined;
  };

  displayLogins = () => {
    const { language } = this.context;
    return <div className="login-modal">
      <header>
        <p>{text[language].NAV_LOGIN_REQUIRED}
          <a className="contact-link" href="mailto:gfw@wri.org">{text[language].NAV_CONTACT_US}</a>.
        </p>
      </header>

      <ul className="subscription-authentication">
        <li className="subscribe-method twitter-box">
          <a href="https://production-api.globalforestwatch.org/auth/twitter?applications=gfw" className="-twitter">
            {text[language].NAV_TWITTER}
          </a>
        </li>

        <li className="subscribe-method facebook-box">
          <a href="https://production-api.globalforestwatch.org/auth/facebook?applications=gfw" className="-facebook">
            {text[language].NAV_FACEBOOK}
          </a>
        </li>

        <li className="subscribe-method google-box">
          <a href="https://production-api.globalforestwatch.org/auth/google?applications=gfw" className="-google">
            {text[language].NAV_GOOGLE}
          </a>
        </li>
      </ul>
    </div>;
  }

  displayOptions = () => {
    const { language } = this.context;
    return <div className="options-modal">
      <ul className="more-list">
        <li className="gfw-api-option">
          <p onClick={this.getSubscriptions}>
            {text[language].NAV_SUBSCRIPTIONS}
          </p>
        </li>
        <li className="gfw-api-option">
          <a href="http://www.globalforestwatch.org/my_gfw" target='_blank'>
            {text[language].NAV_PROFILE}
          </a>
        </li>
        <li className="gfw-api-option">
          <p onClick={this.logOut}>
            {text[language].NAV_LOGOUT}
          </p>
        </li>
      </ul>
    </div>;
  }

  getSubscriptions = () => {
    if (this.state.userSubscriptions.length === 0) {
      fetch(
        'https://production-api.globalforestwatch.org/v1/subscriptions',
        {credentials: 'include'}
      ).then(response => {
        if (response.status !== 200) {
          this.setState({
            userSubscriptions: []
          });
        }
        response.json().then(json => {
          this.setState({
            userSubscriptions: json.data
          });
          mapActions.setUserSubscriptions(json.data);
          mapActions.toggleSubscriptionsModal({ visible: true });
        });
      });
    } else {
      mapActions.toggleSubscriptionsModal({ visible: true });
    }
  }

  logOut = () => {
    fetch(
      'https://production-api.globalforestwatch.org/auth/logout',
      {credentials: 'include'}
    ).then(() => {
      window.location.reload();
    });
  }

  login = () => {
    this.setState({
      loginsDisplayed: !this.state.loginsDisplayed
    });
  }

  toggleOptions = () => {
    this.setState({
      optionsDisplayed: !this.state.optionsDisplayed
    });
  }

  render () {
    const {
      language,
      settings
    } = this.context;

    const LanguageComponent = settings.useAlternativeLanguage ? <LanguageToggle /> : undefined;
    const ThemeComponent = this.renderMapThemes(language, settings);
    const target = settings.navLinksInNewTab ? '_blank' : '_self';

    const loginInfo = this.displayLogins();
    const options = this.displayOptions();

    return (
      <nav className='app-header__nav'>
        <ul className='app-header__nav-list'>
          {ThemeComponent}
          {!settings.downloadLinkUrl ? null :
            <li className='app-header__nav-link pointer'>
              <a target={target} href={settings.downloadLinkUrl}>
                <svg className='svg-icon__nav'><use xlinkHref="#icon-download" /></svg>
                {text[language].NAV_DOWNLOAD}
              </a>
            </li>
          }
          {!settings.aboutLinkUrl ? null :
            <li className='app-header__nav-link pointer'>
              <a target={target} href={settings.aboutLinkUrl}>
                <svg className='svg-icon__nav'>
                  <use xlinkHref="#icon-h-about" />
                </svg>
                {text[language].NAV_ABOUT}
              </a>
            </li>
          }
          {settings.includeMyGFWLogin && !this.state.isLoggedIn ?
            <li onClick={this.login} className={`app-header__nav-link pointer ${this.state.loginsDisplayed ? 'login-open' : ''}`}>
              <a target={target}>
                <svg className='svg-icon__nav'>
                  <use xlinkHref="#icon-h-mygfw" />
                </svg>
                {text[language].NAV_MY_GFW_LOGIN}
              </a>
            </li> : settings.includeMyGFWLogin && this.state.isLoggedIn ?
            <li onClick={this.toggleOptions} className={`app-header__nav-link pointer ${this.state.optionsDisplayed ? 'options-open' : ''}`}>
              <a target={target}>
                <svg className='svg-icon__nav'>
                  <use xlinkHref="#icon-mygfw" /> //TODO: Make this look correct!
                </svg>
                {text[language].NAV_MY_GFW}
              </a>
            </li> : null
          }
          {LanguageComponent}
        </ul>
        {this.state.loginsDisplayed ? loginInfo : null}
        {this.state.optionsDisplayed ? options : null}
      </nav>
    );
  }
}
