import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../store';
import BaseButton from '../../ui/BaseButton';
import { BackIcon } from '../../../../images/backIcon';
import {
  setMultiPolygonSelectionMode,
  setActiveMultiInput,
  setAnalysisFeatureList
} from '../../../store/appState/actions';
import { PenIcon } from '../../../../images/penIcon';
import { PolygonIcon } from '../../../../images/PolygonIcon';
import { analysisContent } from '../../../../../configs/translations/leftPanel.translations';
import { mapController } from '../../../controllers/mapController';
import UploadFile from '../../sharedComponents/UploadFile';
import MethodSelection from './multiPolyAnalysis/MethodSelection';
import { DeleteIcon } from '../../../../images/deleteIcon';

const MultiPolygonAnalysis = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  // const analysisFeatureList = useSelector((store: RootState) => store.appState.analysisFeatureList);

  const analysisFeatureList = useSelector((store: RootState) => store.appState.analysisFeatureList, shallowEqual);
  console.log('analysisFeatureList', analysisFeatureList);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  //TODO: how and when do we disable the analyze button?
  //TODO: Add translations
  const dis = false;

  const BottomBtnWrap = styled.div`
    display: grid;
    grid-template-columns: 80px 160px;
    gap: 15px;
    padding: 0 15px 10px 15px;
  `;
  const BackButton = styled(BaseButton)`
    background-color: white;
    color: ${customColorTheme};
    border: 2px solid ${customColorTheme};
    text-transform: capitalize;
  `;
  const MultiPolyWrap = styled.div`
    padding: 0 15px 10px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #767676;
    p {
      padding: 0;
      border-bottom: 1px solid gray;
      margin: 0 auto;
      padding: 10px 0 10px 0;
    }
  `;

  const handleInputSelection = React.useCallback(
    (inputIndex: number) => {
      const oldState = analysisFeatureList;
      oldState[inputIndex] = undefined;
      dispatch(setAnalysisFeatureList(oldState));
      dispatch(setActiveMultiInput(inputIndex));
    },
    [analysisFeatureList, dispatch]
  );

  const SelectedShapeContainer = ({ label, inputIndex }) => {
    const handleClearSingleAnalysis = React.useCallback((inputIndex: number) => {
      const oldState = [...analysisFeatureList];
      oldState[inputIndex] = undefined;
      mapController.clearGraphicFromMultiSelection(inputIndex);
      console.log('clear');
      dispatch(setAnalysisFeatureList(oldState));
    }, []);

    const Container = styled.div`
      padding: 5px 5px 5px 7px;
      display: grid;
      grid-template-columns: 1fr auto;
    `;
    const Wrap = styled.div`
      background-color: #fff;
      background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
      line-height: 1.1;
      align-items: center;
      display: grid;
      height: 35px;
      border: 1px solid ${customColorTheme};
      color: #242121;
      font-size: 0.9rem;
      padding: 5px;
    `;
    const DeleteButton = styled.button`
      outline: none;
      background: transparent;
      border: 0;
    `;
    return (
      <Container>
        <Wrap>{label}</Wrap>
        <DeleteButton
          onClick={() => {
            handleClearSingleAnalysis(inputIndex);
            console.log('del');
          }}
        >
          <DeleteIcon width={18} height={18} fill={'#ec5555'} />
        </DeleteButton>
      </Container>
    );
  };

  return (
    <div>
      <MultiPolyWrap>
        <p>Analyze overlapping area between two shapes</p>
        {!analysisFeatureList[0] ? (
          <MethodSelection
            handleInputSelection={handleInputSelection}
            customColorTheme={customColorTheme}
            selectedLanguage={selectedLanguage}
            placeholder="Select shape 1 ..."
            inputIndex={0}
          />
        ) : (
          <SelectedShapeContainer inputIndex={0} label="Selected shape 1" />
        )}
        {!analysisFeatureList[1] ? (
          <MethodSelection
            handleInputSelection={handleInputSelection}
            customColorTheme={customColorTheme}
            selectedLanguage={selectedLanguage}
            placeholder="Select shape 2 ..."
            inputIndex={1}
          />
        ) : (
          <SelectedShapeContainer inputIndex={1} label="Selected shape 2" />
        )}
      </MultiPolyWrap>
      <BottomBtnWrap>
        <BackButton
          disabled={dis}
          onClick={() => {
            dispatch(setMultiPolygonSelectionMode(false));
          }}
        >
          <BackIcon height={12} width={12} fill={customColorTheme} />
          {'Back'}
        </BackButton>
        <BaseButton
          disabled={dis}
          onClick={() => {
            console.log('analyze?');
          }}
        >
          {'ANALYZE'}
        </BaseButton>
      </BottomBtnWrap>
    </div>
  );
};

export default React.memo(MultiPolygonAnalysis);
