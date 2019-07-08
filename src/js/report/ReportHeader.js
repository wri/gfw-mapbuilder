import React, {Component} from 'react';
import {getUrlParams} from 'utils/params';
import SVGIcon from './../utils/svgIcon';
import ShareModal from './../components/Modals/ShareModal';
// import {prepareStateForShare} from './../utils/shareUtils';
// import modalActions from './../actions/ModalActions';
// import {toQuerystring} from './../utils/params';
// import basemapUtils from './../utils/basemapUtils';

export default class ReportHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }


    printReport = () => {
        window.print();
      };

    getReportInfo = () => {
        console.log('get report info');
    };

    shareReport = (showModal) => {
        console.log('share report');
        this.setState({
            showModal: !showModal
        });
        // const {map, language, settings} = this.context;
        // const {activeLayers, activeTab, canopyDensity, gladStartDate, gladEndDate, formaStartDate, formaEndDate,
        //   terraIStartDate, terraIEndDate, lossToSelectIndex, lossFromSelectIndex,
        //   imazonStartMonth, imazonEndMonth, imazonStartYear, imazonEndYear,
        //   viirsStartDate, viirsEndDate, modisStartDate, modisEndDate
        // } = this.props;
    
        // const visibleLayers = [];
    
        // activeLayers.forEach(activeLayer => {
        //   if (activeLayer !== layerKeys.USER_FEATURES) {
        //     visibleLayers.push(activeLayer);
        //   }
        // });
    
        // modalActions.showShareModal(toQuerystring(prepareStateForShare({
        //   map: map,
        //   language: language,
        //   settings: settings,
        //   basemap: basemapUtils.getBasemap(),
        //   activeLayers: visibleLayers,
        //   activeTab: activeTab,
        //   gladStartDate: this.formatDate(gladStartDate),
        //   gladEndDate: this.formatDate(gladEndDate),
        //   formaStartDate: this.formatDate(formaStartDate),
        //   formaEndDate: this.formatDate(formaEndDate),
        //   terraIStartDate: this.formatDate(terraIStartDate),
        //   terraIEndDate: this.formatDate(terraIEndDate),
        //   lossToSelectIndex: lossToSelectIndex,
        //   lossFromSelectIndex: lossFromSelectIndex,
        //   imazonStartMonth: imazonStartMonth,
        //   imazonEndMonth: imazonEndMonth,
        //   imazonStartYear: imazonStartYear,
        //   imazonEndYear: imazonEndYear,
        //   viirsStartDate: this.formatDate(viirsStartDate),
        //   viirsEndDate: this.formatDate(viirsEndDate),
        //   modisStartDate: this.formatDate(modisStartDate),
        //   modisEndDate: this.formatDate(modisEndDate),
        //   canopyDensity: canopyDensity
        // })));
    };

    render() {
        const params = getUrlParams(location.href);
        const {title, logoUrl, logoLinkUrl} = params;
        const {showModal} = this.state;
        
        return (
            <div>
                <header className="report-header">
                    <div className='report-header__logo-container'>
                        <a id="logo-anchor" target="_blank" href={logoLinkUrl}>
                            <img src={logoUrl} id="logo" className="report-header__logo" />
                        </a>
                    </div>
                    <div className="report-header__title-container">
                        <h1 id="report-title" className="report-header__title">
                            {`${title} Custom Analysis`}
                        </h1>
                        <ul id="report-icons" className="report-header__icon-container">
                            <li className="report-print" onClick={this.printReport}>
                                <SVGIcon id="report-print-icon" />
                            </li>
                            <li className="report-info" onClick={this.getReportInfo}>
                                <SVGIcon id="report-info-icon" />
                            </li>
                            <li className="report-share" onClick={() => this.shareReport(showModal)}>
                                <SVGIcon id="report-share-icon" />
                            </li>
                        </ul>
                    </div>
                    {showModal &&
                        <div id="share-modal">
                             <ShareModal />
                        </div>
                    }
                </header>
                
            </div>
        );
    }
}
