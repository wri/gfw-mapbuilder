import appActions from 'actions/AppActions';
import mapActions from 'actions/MapActions';
import dispatcher from 'js/dispatcher';

class AppStore {

  constructor () {

    this.language = 'en';
    this.settings = {};
    this.activeWebmap = undefined;

    this.bindListeners({
      setLanguage: appActions.setLanguage,
      applySettings: appActions.applySettings,
      toggleImageryActive: mapActions.toggleImageryActive
    });

  }

  setLanguage (language) {
    this.language = language;
    // If were using the default language, use the default webmap, else use the alternativeWebmap
    if (this.settings.alternativeWebmap) {
      this.activeWebmap = language === this.settings.language ? this.settings.webmap : this.settings.alternativeWebmap;

      //If our language updated, but we are still pointing to the same webmap, we must update our labels into the new language
      if (this.settings.webmap === this.settings.alternativeWebmap) {
        const webmapGroup = this.settings.layerPanel.GROUP_WEBMAP;
        if (!webmapGroup.label.hasOwnProperty(language)) {
          if (this.settings.alternativeLanguage === language) {
            webmapGroup.label[language] = this.settings.alternativeWebmapMenuName;
          } else {
            webmapGroup.label[language] = this.settings.webmapMenuName;
          }
        }
      }
    }
  }

  applySettings (settings) {
    this.settings = settings;
    this.language = settings.language;
    this.activeWebmap = settings.webmap;
  }

  toggleImageryActive () {
    console.log('here')
    // this.settings.layerPanel.GROUP_IMAGERY.hidden = !active;
  }

}

export default dispatcher.createStore(AppStore, 'AppStore');
