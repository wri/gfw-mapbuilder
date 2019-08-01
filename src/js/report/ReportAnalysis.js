import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
            chartComponent: null
        };
    }

    createReportAnalysis = () => {
        const {module} = this.props;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({
                results
            });
        });
    };

    renderReportAnalysis = (module, params, results, language) => {
        let reportLabel = '';
        if (results.data) {
          reportLabel = module.label[language];
        }
        let analysisId = null;
        if (module && module.analysisId) {
            analysisId = module.analysisId;
        }
        let chartType = null;
        if (module && module.chartType) {
            chartType = module.chartType;
        }
       
        return (
          <VegaChart module={module} params={params} chartType={chartType} analysisId={analysisId} reportLabel={reportLabel} component='Report' results={results} language={language} />
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
                    {results.data && this.renderReportAnalysis(module, params, results, language)}
                </div>
            </div>
        );
    }
}
