import React, { FunctionComponent, useState } from 'react';

// import ModalCard from '../modal/modalCard';

import { ReactComponent as PrintIcon } from '../../../images/PrintIcon.svg';

const PrintWidget: FunctionComponent = () => {
  const [printARIA, setPrintARIA] = useState(false);

  // const WidgetContent = () => {
  //   return (
  //     <div className="share-content-container">
  //       <div className="directions">
  //         <p>Choose a print output</p>
  //       </div>
  //     </div>
  //   );
  // };

  const setPrint = () => {
    setPrintARIA(!printARIA);
    // TODO - onClick, dispatch to actionCreator to render Modal
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={printARIA}
          onClick={() => setPrint()}
        >
          <PrintIcon height={25} width={25} fill={'#555'} />
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

export default PrintWidget;
