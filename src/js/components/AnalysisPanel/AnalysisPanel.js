import Instructions from 'components/AnalysisPanel/Instructions';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import CoordinatesTools from 'components/AnalysisPanel/CoordinatesTools';
import Upload from 'components/AnalysisPanel/Upload';
import Analysis from 'components/AnalysisPanel/Analysis';
import analysisKeys from 'constants/AnalysisConstants';
import MapStore from '../../stores/MapStore';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };
  
  state = {
    ...MapStore.getState()
  };
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  render () {
    const {map} = this.context;
    const {isRegistering} = this.state;
    let selectedFeature, selectedFeats;
    let content;

    //- Infer the selected feature from the info window
    if (map.infoWindow && map.infoWindow.getSelectedFeature()) {
      selectedFeats = map.infoWindow.features;
      selectedFeature = map.infoWindow.getSelectedFeature();
    }

    if (selectedFeature !== undefined &&
      selectedFeature.geometry &&
      selectedFeature.geometry.type === analysisKeys.GEOMETRY_POLYGON
    ) {
      content = <Analysis isRegistering={isRegistering} selectedFeature={selectedFeature} selectedFeats={selectedFeats} {...this.props} />;
    } else {
      content = [<Instructions key='instructions' />, <DrawTools key='draw-tools' />, <CoordinatesTools key="coordinates-tools" />, <Upload key='upload'/>];
    }

    return (
      <div className='analysis-panel custom-scroll relative'>
        {content}
      </div>
    );
  }

}
