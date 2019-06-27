import React, {Component} from 'react';


export default class ReportAnalysisArea extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        return (
            <div className="map-analysis-area-container">
                <div id="map" className="map"></div>
                <div id="analysis-area" className="analysis-area">
                    <span className="analysis-area-subtitle">AREA OF ANALYSIS</span>
                    <ul className="analysis-area-list">
                        <li className="analysis-area-list-item">TEST</li>
                    </ul>
                </div>
            </div>
        );
    }
}
