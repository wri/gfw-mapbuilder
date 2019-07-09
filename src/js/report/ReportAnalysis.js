import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';

export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
        };
    }
    
    createReportAnalysis = () => {
        const {module} = this.props;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({
                results: results,
            });
        });
    }
    
    handleReportAnalysisError = analysisId => {
        return (
            <div className="vega-chart-error">
                {`An error occurred performing the selected analysis for ${analysisId}.`}
            </div>
        );
    }
    
    componentDidMount(){
        setTimeout(this.createReportAnalysis(), 10000);
        
    }
    
    render(){
        const {module, params} = this.props;
        const language = params.lang;
        const {results} = this.state;
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper">
                   
                    {!results.data && results.error && this.handleReportAnalysisError(module.analysisId)}
                    {!results.data && <p>LOADING</p>}
                    {results.data && <VegaChart component='Report' results={results} language={language} setLoading={() => this.setState({isLoading: false})} />}
                </div>
            </div>
        );
    }
} 
