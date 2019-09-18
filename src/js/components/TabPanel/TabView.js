import AnalysisPanel from 'components/AnalysisPanel/AnalysisPanel';
import LayerPanel from 'components/LayerPanel/LayerPanel';
import MobileMenu from 'components/TabPanel/MobileMenu';
import LayerToggles from 'components/LayerPanel/LayerToggles';
import InfoWindow from 'components/TabPanel/InfoWindow';
import Measurement from 'components/TabPanel/Measurement';
import Documents from 'components/TabPanel/Documents';
import mapActions from 'actions/MapActions';
import tabKeys from 'constants/TabViewConstants';
import SVGIcon from 'utils/svgIcon';

import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW,
  MEASUREMENT,
  NARRATIVE,
  MORE
} = tabKeys;

const closeSvg = '<use xlink:href="#shape-close" />';

export default class TabView extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  getClassName = (id) => {
    return `tab-view__content ${id === this.props.activeTab ? 'selected' : ''}`;
  };

  getContainerClass = () => {
    const {activeTab, tableOfContentsVisible} = this.props;
    return (
      activeTab === DOCUMENTS ||
      activeTab === LAYERS ||
      activeTab === ANALYSIS ||
      activeTab === INFO_WINDOW ||
      activeTab === MEASUREMENT ||
      activeTab === NARRATIVE ||
      activeTab === MORE
    ) && tableOfContentsVisible ? '' : 'hidden';
  };

  hideTabView = () => {
    //- Setting to an empty string will hide all tabs, so it works well enough for this too
    mapActions.changeActiveTab('');
  };

  render () {
    const {map, settings, language} = this.context;
    const narrative = settings.labels && settings.labels[language] && settings.labels[language].narrative || '';

    return (
      <div className={`tab-view map-component custom-scroll shadow ${this.getContainerClass()}`}>
        {!narrative ? null :
          <div className={this.getClassName(NARRATIVE)}>
            <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
              <SVGIcon id={'shape-close'} />

            </div>
            <h3 className='tab-view__mobile-header mobile-show'>NARRATIVE</h3>
            <div className='tab-view__narrative' dangerouslySetInnerHTML={{ __html: narrative }} />
          </div>
        }
        <div className={this.getClassName(LAYERS)}>
          <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
            <SVGIcon id={'shape-close'} />

          </div>
          <h3 className='tab-view__mobile-header mobile-show'>{text[language].LAYERS}</h3>
          <LayerToggles />
          <LayerPanel loaded={map.loaded} {...this.props} hideTabView={this.hideTabView} />
        </div>
        <div className={this.getClassName(INFO_WINDOW)}>
          <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
            <SVGIcon id={'shape-close'} />

          </div>
          <h3 className='tab-view__mobile-header mobile-show'>{text[language].DATA}</h3>
          <InfoWindow map={map} editingEnabled={this.props.editingEnabled} />
        </div>
        {!settings.includeMeasurementTab ? null :
          <div className={this.getClassName(MEASUREMENT)}>
            <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
              <SVGIcon id={'shape-close'} />

            </div>
            <h3 className='tab-view__mobile-header mobile-show'>{text[language].MEASUREMENT}</h3>
            <Measurement activeWebmap={this.props.activeWebmap} />
          </div>
        }
        <div className={this.getClassName(ANALYSIS)}>
          <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
            <SVGIcon id={'shape-close'} />

          </div>
          <h3 className='tab-view__mobile-header mobile-show'>{text[language].ANALYZE}</h3>
          <AnalysisPanel {...this.props} />
        </div>
        {!settings.includeDocumentsTab ? null :
          <div className={this.getClassName(DOCUMENTS)}>
            <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
              <SVGIcon id={'shape-close'} />

            </div>
            <h3 className='tab-view__mobile-header mobile-show'>{text[language].DOCS}</h3>
            <Documents active={this.props.activeTab === DOCUMENTS} />
          </div>
        }
        <div className={`${this.getClassName(MORE)} mobile-show`}>
          <div title='close' className='close-icon pointer mobile-show' onClick={this.hideTabView} >
            <SVGIcon id={'shape-close'} />

          </div>
          <h3 className='tab-view__mobile-header mobile-show'>{text[language].MORE}</h3>
          <MobileMenu />
        </div>
      </div>
    );
  }

}

TabView.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
