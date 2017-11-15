import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import PrintTemplate from 'esri/tasks/PrintTemplate';
import mapActions from 'actions/MapActions';
import PrintDijit from 'esri/dijit/Print';
import esriRequest from 'esri/request';
import esriConfig from 'esri/config';
import text from 'js/languages';
import React, { Component, PropTypes } from 'react';

const LAYOUT_PARAM = 'Layout_Template';

let created = false, print;

const createPrintWidget = function createPrintWidget (settings, map, language, node) {
  //- Prevent additional widgets from getting created, if creation fails, we can flip this back to false
  created = true;
  //- Get this information from ArcGIS Online Configurations
  const options = {
    scalebarUnit: 'Kilometers',
    customTextElements: [{
      'title': settings.labels[language] ? settings.labels[language].title : ''
    }, {
      'subtitle': settings.labels[language] ? settings.labels[language].subtitle : ''
    }]
  };

  // Fetch templates from the configured print service and use those
  esriRequest({
    url: settings.printServiceUrl,
    handleAs: 'json',
    content: {f: 'json'},
    callbackParamName: 'callback'
  }).then((response) => {
    const {parameters} = response;
    let layoutParams, layouts = [];
    // Try to locate the Layout Params
    if (parameters && parameters.length) {
      parameters.some((param) => {
        if (param.name === LAYOUT_PARAM) {
          layoutParams = param;
          return true;
        }
      });
    }

    if (layoutParams) {
      layouts = layoutParams.choiceList && layoutParams.choiceList.map((item) => {
        return {
          name: item,
          label: item,
          format: 'pdf',
          options
        };
      });
    }

    const templates = layouts.map((layout) => {
      const template = new PrintTemplate();
      template.layout = layout.name;
      template.label = layout.label;
      template.format = layout.format;
      template.layoutOptions = layout.options;
      return template;
    });

    print = new PrintDijit({
      url: settings.printServiceUrl,
      templates: templates,
      map: map
    }, node);

    //- Add the service to Cors Enabled Servers
    esriConfig.defaults.io.corsEnabledServers.push(settings.printServiceUrl);

    print.startup();

  }, console.error);
};

export default class PrintModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentWillReceiveProps() {
    const { settings, map, language } = this.context;
    const node = this.refs.print;
    if (map.loaded && !created) {
      createPrintWidget(settings, map, language, node);
    }
  }

  close = () => {
    mapActions.togglePrintModal({ visible: false });
  };

  render () {
    const { language } = this.context;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='print-dijit-label'>
          {text[language].PRINT_BUTTON_LABEL}
        </div>
        <div ref='print' className='print-dijit' />
      </ControlledModalWrapper>
    );
  }

}
