import React, {Component} from 'react';
import analysisUtils from 'utils/analysisUtils';
import VegaChart from '../components/AnalysisPanel/VegaChart';
import Loader from 'components/Loader';

export default class ReportAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {},
            isLoading: true
        };
    }
    
    createReportAnalysis = () => {
        const {module} = this.props;
        //const language = params.lang;
        const reportParams = module.reportParams;
        analysisUtils.getCustomAnalysis(module, reportParams).then(results => {
            this.setState({
            results: results,
            isLoading: false
            });
        });
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
                    {!results.data && <Loader active={isLoading} />}
                    {results.error && 'Error'}
                    {results.data && <VegaChart component='Report' results={results} language={language} setLoading={() => this.setState({isLoading: false})}/>}
                    {/* <div className="vega-chart-info-container">
                        <div className="vega-chart-info">
                            {module.description[language]}
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}  
