import React, { FunctionComponent, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { ReactComponent as TwitterIcon } from 'src/images/twitterIcon.svg';
import { ReactComponent as FacebookIcon } from 'src/images/facebookIcon.svg';

import { mapController } from 'js/controllers/mapController';

import { shareContent } from '../../../../../configs/modal.config';

const ShareContent: FunctionComponent = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { allAvailableLayers } = useSelector(
    (state: RootState) => state.mapviewState
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { title, instructions } = shareContent[selectedLanguage];
  const popupDimensions = 'toolbar=0,status=0,height=650,width=450';

  const copyURLToClipboard = (): void => {
    urlRef.current.select();
    document.execCommand('copy');
    // ? do we need a bitly account (like in master branch) to shortern URLs ?
    // TODO which accounts for long mapbuilder URLs
  };

  const shareTwitter = (): void => {
    window.open(
      `https://twitter.com/share?url=${window.location.href}`,
      'Twitter',
      popupDimensions
    );
  };

  const shareFacebook = (): void => {
    // https://www.facebook.com/sharer.php?u=http://bit.ly/2I6y3Te

    window.open(
      `https://www.facebook.com/sharer.php?u=${window.location.href}`,
      'Facebook',
      popupDimensions
    );
  };

  const returnURL = (): string => {
    const { latitude, longitude, zoom } = mapController.getMapviewCoordinates();
    const visibleLayersURL = allAvailableLayers
      .filter(layer => layer.visible)
      .map(layer => layer.id)
      .join('%2C');

    return `${window.location.href}&lat=${latitude}&lon=${latitude}&z=${zoom}&activeLayers=${visibleLayersURL}`;
  };

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{title}</h4>
        <p>{instructions}</p>
        <div className="copy-link-wrapper">
          <input type="text" readOnly value={returnURL()} ref={urlRef}></input>
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
