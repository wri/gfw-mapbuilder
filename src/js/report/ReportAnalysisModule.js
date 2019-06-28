import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import analysisUtils from 'utils/analysisUtils';

export default class ReportAnalysisModule extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidUpdate(){
    
    }
    
    render(){
        const {module} = this.props;
        console.log('module', module);
        return (
            <div id={`${module.analysisId}_div`}>
                <div >TEST</div>
            </div>
        );
    }
}

 // const div = document.createElement('div');
        // div.id = module.analysisId + '_div';
        // div.classList.add('vega-chart-wrapper');
        
        // const reportContainerDiv = document.createElement('div');
        // reportContainerDiv.classList.add('report-container');
        // reportContainerDiv.appendChild(div);
        // resultsContainer.appendChild(reportContainerDiv);
        // const infoContainerDiv = document.createElement('div');
        // infoContainerDiv.classList.add('vega-chart-info-container');
        // const infoDiv = document.createElement('div');
        // infoDiv.classList.add('vega-chart-info');
        // infoDiv.innerHTML = module.description[language];
        // infoContainerDiv.appendChild(infoDiv);
        
