import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../js/store';

import { windSpeedConfig } from '../../../../configs/translations/leftPanel.translations';
import { setTreeHeight } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';

const WindSpeedPicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const treeHeight = useSelector((store: RootState) => store.appState.leftPanel.treeHeight);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const { displayLabel } = windSpeedConfig[selectedLanguage];

  function handleDensityButtonClick(e): void {
    mapController.updateTreeHeightValue(e.target.value);
    dispatch(setTreeHeight(e.target.value));
  }

  return (
    <div
      className="canopy-density-picker-wrapper"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
      }}
    >
      <span>{displayLabel[0]} </span>
      <select
        className="date-time-toggle"
        style={{ border: `1px solid ${customColorTheme}`, width: '2.4rem', fontWeight: 600 }}
        onChange={(e): void => handleDensityButtonClick(e)}
        value={treeHeight}
      >
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
      <span> {displayLabel[1]}</span>
    </div>
  );
};

export default WindSpeedPicker;
