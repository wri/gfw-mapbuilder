import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../js/store/index';
import { TwitterIcon } from '../../../../images/twitterIcon';
import { FacebookIcon } from '../../../../images/facebookIcon';
import { shareContent } from '../../../../../configs/translations/modal.tanslations';
import { analysisReportConfig } from '../../../../../configs/translations/report.translations';
import { getShareableURL } from '../../../../js/helpers/shareFunctionality';

const ShareContent: FunctionComponent = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const [urlValue, setUrlValue] = useState<any>('');
  const { title } = shareContent[selectedLanguage];
  const { shareModalTitle, copyButtonInShareModal } = analysisReportConfig;
  const popupDimensions = 'toolbar=0,status=0,height=650,width=450';

  const copyURLToClipboard = (): void => {
    urlRef.current.select();
    document.execCommand('copy');
    // ? do we need a bitly account (like in master branch) to shortern URLs ?
    // TODO which accounts for long mapbuilder URLs
  };

  const shareTwitter = (): void => {
    window.open(`https://twitter.com/share?url=${window.location.href}`, 'Twitter', popupDimensions);
  };

  const shareFacebook = (): void => {
    // https://www.facebook.com/sharer.php?u=http://bit.ly/2I6y3Te

    window.open(`https://www.facebook.com/sharer.php?u=${window.location.href}`, 'Facebook', popupDimensions);
  };

  useEffect((): any => {
    async function returnURL(): Promise<void> {
      //Let's check if we are in the report mode or not
      const reportParam = new URL(window.location.href).searchParams.get('report');
      let reportView;
      if (reportParam) {
        reportView = reportParam === 'true';
      } else {
        reportView = false;
      }

      const appID = new URL(window.location.href).searchParams.get('appid');

      const baseUrl = new URL(window.location.href);

      if (reportView) {
        //If we are in Report VIEW, we already have a share URL, no need to do anything
        setUrlValue(baseUrl);
      } else {
        //Construct share URL based on parameters. For REPORT view, we need to register geometry and
        //get back geostoreID to add to the URL, for NORMAL views we do not share the active feature
        //so that is not done currently.
        const stateUrl = await getShareableURL({ report: reportView });
        let combinedReportURL = baseUrl.origin + baseUrl.pathname;
        combinedReportURL = appID
          ? combinedReportURL + '?' + 'appid=' + appID + '&' + stateUrl
          : combinedReportURL + '?' + stateUrl;
        setUrlValue(combinedReportURL);
      }
    }
    returnURL();
  }, []);

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{title}</h4>
        <p>{shareModalTitle[selectedLanguage]}</p>
        <div className="copy-link-wrapper">
          <input type="text" readOnly value={urlValue} ref={urlRef}></input>
          <button onClick={(): void => copyURLToClipboard()}>{copyButtonInShareModal[selectedLanguage]}</button>
        </div>
        <div className="share-button-wrapper">
          <button onClick={(): void => shareTwitter()} className="share-button twitter">
            <TwitterIcon width={20} height={20} fill={'#fff'} />
          </button>
          <button onClick={(): void => shareFacebook()} className="share-button facebook">
            <FacebookIcon width={20} height={20} fill={'#fff'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareContent;
