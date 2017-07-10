import {createTracker} from 'utils/googleAnalytics';
import appActions from 'actions/AppActions';
import Header from 'components/Header';
import AppStore from 'stores/AppStore';
import template from 'utils/template';
import Map from 'components/Map';
import {getUrlParams} from 'utils/params';
import React, {
  Component,
  PropTypes
} from 'react';

export default class App extends Component {

  static childContextTypes = {
    language: PropTypes.string,
    settings: PropTypes.object
  };

  getChildContext = () => {
    return {
      language: this.state.language,
      settings: this.state.settings
    };
  };

  constructor (props) {
    super(props);
    this.state = AppStore.getState();
  }

  componentDidMount() {
    AppStore.listen(this.storeDidUpdate);
    template.getAppInfo().then(settings => {
      if (this.props.constructorParams && this.props.constructorParams.config) {
        this.updateBasemapImages(this.props.constructorParams.config);

        lang.mixin(settings, this.props.constructorParams.config);

        const appid = getUrlParams(location.href).appid;
        if (appid) {
          template.getAppInfo(appid).then(newSettings => {
            this.setSettings(newSettings);
          });
        } else {
          this.setSettings(settings);
        }
      } else {
        this.setSettings(settings);
      }

    });
  }

  storeDidUpdate = () => {
    this.setState(AppStore.getState());
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
      this.updateTitle(this.state.settings);
    }
  }

  setSettings = (settings) => {
    appActions.applySettings(settings);
    this.updateTitle(settings);
    createTracker('UA-62288390-15');
    if (settings.analyticsCode) {
      createTracker(settings.analyticsCode);
    }
  }

  updateTitle = (settings) => {
    const {language} = this.state;
    const labels = settings.labels[language];
    if (labels && labels.title) {
      document.title = labels.title;
    }
  };

  render () {
    return (
      <div className='root'>
        <Header />
        <Map {...this.state} />
      </div>
    );
  }

}
