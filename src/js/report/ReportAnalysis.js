import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
import Loader from './../components/Loader';
import ReportSettings from './ReportSettings';

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
        console.log('module', module);
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
        const analysisId = module.analysisId;
        const {results, isLoading} = this.state;
        let reportLabel = '';
        if(results.data){
            reportLabel = module.label[language];
        }
        console.log('params', params);
        console.log('module', module);
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper">
                    <Loader active={isLoading} />
                    {!results.data && results.error && this.handleReportAnalysisError(module.analysisId)}
                    {results.data &&
                        <div>
                            <VegaChart analysisId={analysisId} module={module} params={params} reportLabel={reportLabel} component='Report' results={results} language={language} setLoading={() => this.setState({isLoading: false})} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}
