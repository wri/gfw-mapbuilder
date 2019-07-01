import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from './../components/AnalysisPanel/VegaChart';

export default class ReportAnalysisModule extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {}
        };
    }
    
    createReportAnalysis = () => {
        const {module} = this.props;
        //const language = params.lang;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({results: results});
        });
    }
    
    componentDidMount(){
        this.createReportAnalysis();
    }
    
    render(){
        const {module, params} = this.props;
        const language = params.lang;
        const reportParams = module.reportParams;
        const results = this.state.results;
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper" id={`${module.analysisId}_div`}>
                    {results.error && 'Error'}
                    {results.data && <VegaChart component='Report' results={results} language={language} />}
                    <div className="vega-chart-info-container">
                        <div className="vega-chart-info">
                            {/* placeholder for the metadata description */}
                            {module.description[language]}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}  
