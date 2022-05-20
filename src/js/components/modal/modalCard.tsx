import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrintModal } from '../mapWidgets/widgetContent/printModal';
import ShareContent from '../../../js/components/mapWidgets/widgetContent/shareContent';
import PenContent from '../../../js/components/mapWidgets/widgetContent/penContent';
import SearchContent from '../../../js/components/mapWidgets/widgetContent/searchContent';
import CoordinatesForm from '../../../js/components/mapWidgets/widgetContent/coordinatesForm';
import MeasureContent from '../../../js/components/mapWidgets/widgetContent/measureContent';
import CanopyDensityContent from '../../../js/components/mapWidgets/widgetContent/CanopyDensityContent';
import SubscriptionContent from '../../../js/components/dataPanel/subscribeToAlerts/SubscriptionContent';
import SaveAOI from '../leftPanel/dataPanel/subscribeToAlerts/SaveAOI';
import InfoContent from '../../../js/components/sharedComponents/InfoContent';
import LayerDash from '../../../js/components/sharedComponents/LayerDash';
import EditProfile from '../../../js/components/gfwContent/EditProfile';
import PlanetInfo from '../../../js/components/leftPanel/layersPanel/PlanetInfo';

import { renderModal } from '../../store/appState/actions';

import { RootState } from '../../store';

import '../../../css/modalCard.scss';
import TreeMosaicContent from '../mapWidgets/widgetContent/TreeMosaicContent';
import ForestGrossRemovalContent from '../mapWidgets/widgetContent/ForestGrossRemovalContent';
import ForestGrossCarbonEmissionContent from '../mapWidgets/widgetContent/ForestCarbonGrossEmissionContent';
import ForestCarbonNetFluxContent from '../mapWidgets/widgetContent/ForesCarbonNetFlux';

const ModalCard: FunctionComponent<{}> = () => {
  const modalType = useSelector((state: RootState) => state.appState.renderModal);
  const dispatch = useDispatch();

  const handleEscapeKey = (key: string) => {
    if (key === 'Escape') {
      dispatch(renderModal(''));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      handleEscapeKey(e.key);
    });
    return () => {
      window.removeEventListener('keydown', (_) => handleEscapeKey('Escape'));
    };
  }, []);

  const returnContent = () => {
    switch (modalType) {
      case 'PrintWidget':
        return <PrintModal />;
      case 'ShareWidget':
        return <ShareContent />;
      case 'PenWidget':
        return <PenContent />;
      case 'PenWidget-CoordinatesForm':
        return <CoordinatesForm />;
      case 'AOIDashboard':
        return <SubscriptionContent />;
      case 'SaveAOI':
        return <SaveAOI />;
      case 'SearchWidget':
        return <SearchContent />;
      case 'MeasureWidget':
        return <MeasureContent />;
      case 'CanopyDensity':
        return <CanopyDensityContent />;
      case 'treeMosaic':
        return <TreeMosaicContent />;
      case 'forestCarbonRemoval':
        return <ForestGrossRemovalContent />;
      case 'forestCarbonGrossEmissions':
        return <ForestGrossCarbonEmissionContent />;
      case 'forestCarbonNetFlux':
        return <ForestCarbonNetFluxContent />;
      case 'InfoContent':
        return <InfoContent />;
      case 'EditProfile':
        return <EditProfile />;
      case 'PlanetInfo':
        return <PlanetInfo />;
      case 'LayerDash':
        return <LayerDash />;
      default:
        break;
    }
  };

  const setClassName = (): string => {
    switch (modalType) {
      case 'MeasureWidget':
        return 'measure-widget';
      case 'GFWLoginWidget':
        return 'gfw-login-widget';
      case 'PenWidget':
        return 'pen-widget';
      case 'PenWidget-CoordinatesForm':
        return 'pen-widget-coordform';
      case 'SearchWidget':
        return 'search-widget';
      case 'PrintWidget':
        return 'print-widget';
      case 'ShareWidget':
        return 'share-widget';
      case 'InfoContent':
        return 'info-content';
      case 'AOIDashboard':
        return 'subscription-widget';
      case 'SaveAOI':
        return 'saveAOI';
      case 'EditProfile':
        return 'edit-profile';
      case 'PlanetInfo':
        return 'planet-info';
      case 'LayerDash':
        return 'layer-dashboard';
      default:
        return '';
    }
  };

  return (
    <>
      {modalType !== '' ? (
        <>
          <div
            className={`dim-container ${setClassName()}`}
            onClick={() => dispatch(renderModal(''))}
            role="button"
            tabIndex={0}
          ></div>
          <div className={`modal-card-container ${setClassName()}`}>
            <button style={{ color: '#555' }} className="exit-button" onClick={() => dispatch(renderModal(''))}>
              <svg className="svg-icon">
                <svg id="shape-close" viewBox="0 0 25 25">
                  <title>Close</title>
                  <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
                </svg>
              </svg>
            </button>
            {returnContent()}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalCard;
