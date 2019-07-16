import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
import Loader from '/Users/kkremer/Desktop/Projects/gfw-mapbuilder/src/js/components/Loader';
export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
            chartComponent: null
        };
    }
    
    createReportAnalysis = () => {
        this.setState({
            results: {}
        });
        const {module} = this.props;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({
                results
            });
        });
    };
    
    renderReportAnalysis = (module, results, language) => {
        const reportLabel = module.label[language];
        return (
            <div style={{width: "500px", height: "500px"}}>
                <Loader active={true} />
                <VegaChart reportLabel={reportLabel} component='Report' results={results} language={language} />
            </div>
        );
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
        const language = params.lang;
        const {results} = this.state;
        return (
            <div className="report-container">
                <div className="vega-chart-wrapper">
                    {(!results.data && results.error) && this.handleReportAnalysisError(module.analysisId)}
                    {results.data && this.renderReportAnalysis(module, results, language)}
                </div>
            </div>
        );
    }
}
