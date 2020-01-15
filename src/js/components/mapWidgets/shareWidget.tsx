import React, { FunctionComponent, useState } from 'react';

// import ModalCard from '../modal/modalCard';

import { ReactComponent as ShareIcon } from '../../../images/ShareIcon.svg';

const ShareWidget: FunctionComponent = () => {
  const [shareARIA, setShareARIA] = useState(false);

  // const WidgetContent = () => {
  //   return (
  //     <div className="share-content-container">
  //       <div className="directions">
  //         <h4 className="title">Share this view</h4>
  //         <p>
  //           Copy and paste the link to share it or use the buttons below to
  //           share on social media.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  const setShare = () => {
    setShareARIA(!shareARIA);
    // TODO dispatch actionCreator to render Share form
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={shareARIA}
          onClick={() => setShare()}
        >
          <ShareIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
      {/* <ModalCard
        renderModal={openWidget}
        setOpenWidget={(modalStatus: boolean) => setOpenWidget(modalStatus)}
      >
        <WidgetContent />
      </ModalCard> */}
    </>
  );
};

export default ShareWidget;
