import React, {Component} from 'react';
import {getUrlParams} from 'utils/params';
import SVGIcon from './../utils/svgIcon';

export default class ReportHeader extends Component {
    constructor(props) {
      super(props);
    }

    printReport = () => {
        console.log('print report');
      };

    getReportInfo = () => {
        console.log('get report info');
    };

    shareReport= () => {
        console.log('share report');
    };

    render() {
        const params = getUrlParams(location.href);
        const {title, logoUrl, logoLinkUrl} = params;
        console.log('params', params);// subtitle was in params
        
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
                        <div id="report-icons" className="report-header__icon-container">
                            <div className="report-print" onClick={this.printReport}>
                                <SVGIcon id="report-print-icon" />
                            </div>
                            <div className="report-info" onClick={this.getReportInfo}>
                                <SVGIcon id="report-info-icon" />
                            </div>
                            <div className="report-share" onClick={this.shareReport}>
                                <SVGIcon id="report-share-icon" />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
