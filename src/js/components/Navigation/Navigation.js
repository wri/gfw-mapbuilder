import LanguageToggle from 'components/Navigation/LanguageToggle';
import MapThemes from 'components/Navigation/MapThemes';
import Deferred from 'dojo/Deferred';
import esriRequest from 'esri/request';
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
          console.log('err', err);
        });
      }
    }
  }

  checkLoggedIn = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://production-api.globalforestwatch.org/auth/check-logged',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
    // const promise = new Deferred();
    // esriRequest({
    //   url: 'https://production-api.globalforestwatch.org/auth/check-logged',
    //   callbackParamName: 'callback',
    //   handleAs: 'json',
    //   timeout: 30000
    // }, { usePost: false}).then(res => {
    //   console.error('res', res);
    //   promise.resolve(true);
    // }, err => {
    //   console.error('err', err);
    //   promise.resolve(false);
    // });
    // return promise;
  }

  renderMapThemes = (language, settings) => {
    const shouldRender = settings.labels &&
                       settings.labels[language] &&
                       settings.labels[language].themes !== undefined;
    const target = settings.navLinksInNewTab ? '_blank' : '_self';

    return shouldRender ? <MapThemes themes={settings.labels[language].themes} target={target} /> : undefined;
  };

  displayLogins = () => { //TODO: No hardcoding text -- get proper language forEach!
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

  displayOptions = () => { //TODO: No hardcoding text -- get proper language forEach!
    return <div className="options-modal">
      <ul className="more-list">
        <li className="gfw-api-option">
          <p onClick={this.getSubscriptions}>
            My Subscriptions
          </p>
        </li>
        <li className="gfw-api-option">
          <a href="https://production-api.globalforestwatch.org/my_gfw/stories">
            My Stories
          </a>
        </li>
        <li className="gfw-api-option">
          <a href="https://production-api.globalforestwatch.org/my_gfw">
            My Profile
          </a>
        </li>
        <li className="gfw-api-option">
          <p onClick={this.logOut}>
            Log Out
          </p>
        </li>
      </ul>
    </div>;
  }

  getSubscriptions = () => {
    if (this.state.userSubscriptions.length === 0) {
      $.ajax({
        url: 'https://production-api.globalforestwatch.org/v1/subscriptions',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: (response) => {
          console.log('resp', response);
          this.setState({
            userSubscriptions: response.data
          });
          mapActions.setUserSubscriptions(response.data);
          mapActions.toggleSubscriptionModal({ visible: true });
        },
        error: (error) => {
          console.log('err', error);
          this.setState({
            userSubscriptions: []
          });
        }
      });
    } else {
      mapActions.setUserSubscriptions(this.state.userSubscriptions);
      mapActions.toggleSubscriptionModal({ visible: true });
    }
    // esriRequest({
    //   url: 'https://production-api.globalforestwatch.org/v1/subscriptions/' + this.state.userData.id,
    //   callbackParamName: 'callback',
    //   handleAs: 'json',
    //   timeout: 30000
    // }, { usePost: false}).then(res => {
    //   console.error('res', res);
    // }, err => {
    //   console.error('err', err);
    // });
  }

  logOut = () => {
    console.log('logout', this.state);
    $.ajax({
      url: 'https://production-api.globalforestwatch.org/auth/logout',
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: () => {
        window.location.reload();
      },
      error: () => {
        window.location.reload();
      }
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
                {text[language].NAV_MY_GFW}
              </a>
            </li> : settings.includeMyGFWLogin && this.state.isLoggedIn ?
            <li onClick={this.toggleOptions} className={`app-header__nav-link pointer ${this.state.loginsDisplayed ? 'login-open' : ''}`}>
              <a target={target}>
                <svg className='svg-icon__nav'>
                  <use xlinkHref="#icon-mygfw" /> //TODO: Make this look correct!
                </svg>
                MY GFW!
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
