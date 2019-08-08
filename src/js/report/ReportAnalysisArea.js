import React, {Component} from 'react';


export default class ReportAnalysisArea extends Component {

    render() {
        const {selectedFeatureTitles} = this.props;
        const selectedFeatureTitlesArray = selectedFeatureTitles.split(',');
        return (
            <div className="map-analysis-area-container">
                <div id="map" className="map"></div>
                <div id="analysis-area" className="analysis-area">
                    <span className="analysis-area-subtitle">AREA OF ANALYSIS</span>
                    <ul className="analysis-area-list">
                        {selectedFeatureTitlesArray.length > 0 && selectedFeatureTitlesArray.map((title, index) => <li key={`analysis-area-${index}`}className="analysis-area-list-item">{title}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
