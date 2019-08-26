import React, {Component} from 'react';


export default class ReportAnalysisArea extends Component {

    render() {
        const {selectedFeatureTitles} = this.props;
        let selectedFeatureTitlesArray = [];
        if (selectedFeatureTitles !== ''){
            selectedFeatureTitlesArray = selectedFeatureTitles.split(',');
        }
        return (
            <div className="map-analysis-area-container">
                <div id="map" className="map"></div>
                <div id="analysis-area" className="analysis-area">
                    <span className="analysis-area-subtitle">AREA OF ANALYSIS</span>
                    {/* Save if we want to display multiple selected feature titles later */}
                    {/* <ul className="analysis-area-list">
                        {selectedFeatureTitlesArray && selectedFeatureTitlesArray.length > 0 && selectedFeatureTitlesArray.map((title, index) => <li key={`analysis-area-${index}`}className="analysis-area-list-item">{title}</li>)}
                    </ul> */}
                    {selectedFeatureTitlesArray.length > 0 &&
                        <div className="analysis-area-selected-feature-title">
                            {selectedFeatureTitlesArray[0]}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
