import React, {Component} from 'react';
import {getUrlParams} from 'utils/params';
import SVGIcon from './../utils/svgIcon';

export default class ReportHeader extends Component {
    constructor(props) {
        super(props);
    }

    printReport = () => {
        window.print();
      };

    shareReport = () => {
        document.getElementById('share-modal').classList.toggle('hidden');
    };

    render() {
        const params = getUrlParams(location.href);
        const {title, logoUrl, logoLinkUrl} = params;
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
                            <li className="report-share" onClick={this.shareReport}>
                                <SVGIcon id="report-share-icon" />
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}
