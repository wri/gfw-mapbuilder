import React, {Component} from 'react';


export default class ReportAnalysisArea extends Component {

    render() {
        const {customFeatureTitle} = this.props.params;
        // This will be useful later when we do have have multiple titles to display in the Analysis ReportAnalysisArea.
        const titlesArray = customFeatureTitle.split(',');
        return (
            <div className="map-analysis-area-container">
                <div id="map" className="map"></div>
                <div id="analysis-area" className="analysis-area">
                    <span className="analysis-area-subtitle">AREA OF ANALYSIS</span>
                    <ul className="analysis-area-list">
                        {titlesArray && titlesArray.map((title, index) => <li key={`analysis-area-${index}`} className="analysis-area-list-item">{title}</li>)}
                    </ul>
                </div>
                <div className="page-break"></div>
            </div>
        );
    }
}
