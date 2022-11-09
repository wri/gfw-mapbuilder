import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../js/store';

import { treeHeightConfig } from '../../../../configs/translations/leftPanel.translations';
import { setTreeHeight } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';
import { handleCustomColorTheme } from '../../../utils';

const TreeHeightPicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const treeHeight = useSelector((store: RootState) => store.appState.leftPanel.treeHeight);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const { displayLabel } = treeHeightConfig[selectedLanguage];

  const themeColor = handleCustomColorTheme(customColorTheme);

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
        marginTop: 10,
      }}
    >
      <span>{displayLabel[0]} </span>
      <select
        className="date-time-toggle"
        style={{ border: `1px solid ${themeColor}`, width: '2.4rem', fontWeight: 600 }}
        onChange={(e): void => handleDensityButtonClick(e)}
        value={treeHeight}
      >
        <option value={3}>≥ 3</option>
        <option value={4}>≥ 4</option>
        <option value={5}>≥ 5</option>
        <option value={7}>≥ 7</option>
        <option value={10}>≥ 10</option>
        <option value={15}>≥ 15</option>
        <option value={20}>≥ 20</option>
      </select>
      <span> {displayLabel[1]}</span>
    </div>
  );
};

export default TreeHeightPicker;
