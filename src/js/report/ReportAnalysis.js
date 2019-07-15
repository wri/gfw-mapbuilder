import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
import Loader from '../components/Loader';

export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
            isLoading: false,
            chartComponent: null
        };
    }
    
    createReportAnalysis = () => {
        this.setState({
            results: {},
            isLoading: true
        });
        const {module, params} = this.props;
        const language = params.lang;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
           this.renderReportAnalysis(results, language);
        });
    };
    
    renderReportAnalysis = (results, language) => {
        const chartComponent = <VegaChart component='Report' results={results} language={language} setLoading={() => this.setState({isLoading: false})} />
        this.setState({
            chartComponent,
            isLoading: false
        });
    };
    
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
        const {results, isLoading, chartComponent} = this.state;
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper">
                    {(!results.data && results.error) && this.handleReportAnalysisError(module.analysisId)}
                    <Loader active={isLoading} />
                    {chartComponent &&
                        <div>
                            {chartComponent}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
