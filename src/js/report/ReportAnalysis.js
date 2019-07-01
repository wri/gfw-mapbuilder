import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
import Loader from './../components/Loader';

export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
            isLoading: false
        };
    }
    
    createReportAnalysis = () => {
        this.setState({
            isLoading: true
        });
        const {module} = this.props;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({
                results: results,
                isLoading: false
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
        this.createReportAnalysis();
    }
    
    render(){
        const {module, params} = this.props;
        const language = params.lang;
        const {results, isLoading} = this.state;
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper" id={`${module.analysisId}_div`}>
                    <Loader active={isLoading} />
                    {!results.data && results.error && this.handleReportAnalysisError(module.analysisId)}
                    {results.data && <VegaChart component='Report' results={results} language={language} setLoading={() => this.setState({isLoading: false})} />}
                </div>
            </div>
        );
    }
} 
