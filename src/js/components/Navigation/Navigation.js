import LanguageToggle from 'components/Navigation/LanguageToggle';
import MapThemes from 'components/Navigation/MapThemes';
import Deferred from 'dojo/Deferred';
import esriRequest from 'esri/request';
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
      isLoggedIn: false,
      loginsDisplayed: false
    };
  }

  componentDidMount () {
    this.checkLoggedIn().then(res => {
      console.log('res', res);
    }, err => {
      console.log('err', err);
    });
  }

  checkLoggedIn = () => {
    console.log('checkLoggedIn');
    const promise = new Deferred();
    esriRequest({
      url: 'https://production-api.globalforestwatch.org/auth/check-logged',
      callbackParamName: 'callback',
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false}).then(res => {
      console.error('res', res);
      promise.resolve(true);
    }, err => {
      console.error('err', err);
      promise.resolve(false);
    });
    return promise;
  }

  renderMapThemes = (language, settings) => {
    const shouldRender = settings.labels &&
                       settings.labels[language] &&
                       settings.labels[language].themes !== undefined;
    const target = settings.navLinksInNewTab ? '_blank' : '_self';

    return shouldRender ? <MapThemes themes={settings.labels[language].themes} target={target} /> : undefined;
  };

  displayLogins = () => { //TODO: No hardcoding text -- get proper language forEach!
    console.log('displayLogins');
    return <div className="steps current login-modal">
            <header>
              <p>
                Log in is required so you can return to Global Forest Watch
                to view, manage, and delete your subscriptions.
                Questions? <a className="contact-link" href="mailto:gfw@wri.org">Contact us</a>.
              </p>
            </header>

            <ul className="subscription-authentication">
              <li className="subscribe-method twitter-box">
                <a href="https://production-api.globalforestwatch.org/auth/twitter?applications=gfw" className="-twitter">
                  <svg className="svg-icon"><use xlinkHref="#icon-twitter"></use></svg>
                  Log in with Twitter
                </a>
              </li>

              <li className="subscribe-method facebook-box">
                <a href="https://production-api.globalforestwatch.org/auth/facebook?applications=gfw" className="-facebook">
                  <svg className="svg-icon"><use xlinkHref="#icon-facebook"></use></svg>
                  Log in with Facebook
                </a>
              </li>

              <li className="subscribe-method google-box">
                <a href="https://production-api.globalforestwatch.org/auth/google?applications=gfw" className="-google">
                  <svg className="svg-icon"><use xlinkHref="#icon-googleplus"></use></svg>
                  Log in with Google
                </a>
              </li>
            </ul>
          </div>;
  }

  login = () => {
    console.log('login!');
    this.setState({
      loginsDisplayed: !this.state.loginsDisplayed
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
          {!settings.includeMyGFWLogin ? null :
            <li onClick={this.login} className={`app-header__nav-link pointer ${this.state.loginsDisplayed ? 'login-open' : ''}`}>
              <a target={target}>
                <svg className='svg-icon__nav'>
                  <use xlinkHref="#icon-h-mygfw" />
                </svg>
                {text[language].NAV_MY_GFW}
              </a>
            </li>
          }
          {LanguageComponent}
        </ul>
        {this.state.loginsDisplayed ? loginInfo : null}
      </nav>
    );
  }
}
