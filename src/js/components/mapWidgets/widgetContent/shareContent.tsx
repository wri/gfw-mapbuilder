import React, { FunctionComponent, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { ReactComponent as TwitterIcon } from 'src/images/TwitterIcon.svg';
import { ReactComponent as FacebookIcon } from 'src/images/FacebookIcon.svg';

import { shareContent } from '../../../../../configs/modal.config';

const ShareContent: FunctionComponent = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { title, instructions } = shareContent[selectedLanguage];
  const popupDimensions = 'toolbar=0,status=0,height=650,width=450';

  const copyURLToClipboard = (): void => {
    urlRef.current.select();
    document.execCommand('copy');
  };

  const shareTwitter = (): void => {
    window.open(
      `https://twitter.com/share?url=${window.location.href}`,
      'Twitter',
      popupDimensions
    );
  };

  const shareFacebook = (): void => {
    const appID = 481743892710575;

    window.open(
      `https://www.facebook.com/dialog/feed?
      app_id=${appID}
      &link=${window.location.href}
      &redirect_uri=http://localhost:8080/`,
      'Facebook',
      popupDimensions
    );
    // * NOTE; FB share button will open with error
    // * 'Parameter 'href' should represent a valid URL'
    // * because it doesn't support localhost URLs
  };

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{title}</h4>
        <p>{instructions}</p>
        <div className="copy-link-wrapper">
          <input
            type="text"
            readOnly
            value={window.location.href}
            ref={urlRef}
          ></input>
          <button onClick={(): void => copyURLToClipboard()}>COPY</button>
        </div>
        <div className="share-button-wrapper">
          <button
            onClick={(): void => shareTwitter()}
            className="share-button twitter"
          >
            <TwitterIcon width={20} height={20} fill={'#fff'} />
          </button>
          <button
            onClick={(): void => shareFacebook()}
            className="share-button facebook"
          >
            <FacebookIcon width={20} height={20} fill={'#fff'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareContent;
