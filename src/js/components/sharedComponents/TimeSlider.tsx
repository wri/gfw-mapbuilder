import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSliderWithTooltip, Range } from 'rc-slider';
import { mapController } from '../../controllers/mapController';
import { setTimeSlider } from '../../store/mapview/actions';
import { RootState } from '../../store';
import {
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setGladEnd,
  setGladStart,
  setGlad2Start,
  setGlad2End,
  setRaddAlertStart,
  setRaddAlertEnd,
  setTreeCoverLossStart,
  setTreeCoverLossEnd,
} from '../../store/appState/actions';
import { LAYER_IDS } from '../../../../configs/layer-config';
const SliderWithTooltip = createSliderWithTooltip(Range);
import { format } from 'date-fns';
import { handleCustomColorTheme } from '../../../utils';
import { DATES } from '../../../../configs/dates-config';
import { generateDefaultMarks, generateGWFDateRange } from '../leftPanel/layersPanel/GenericLayerControl';
const { TREE_COVER_LOSS } = DATES;

interface TimeSliderProps {
  layer?: any;
  layerID: string;
  defaultMarks: any;
  min: number | any;
  max?: number | any;
  defaultValue: Array<number> | any;
  steps?: number | null;
  included: boolean;
  type?: string;
  dots?: boolean;
  intervalSpeed?: number;
}

const LAYERS_DATE_RANGE = new Map();

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID, dots = true, intervalSpeed = 1000 } = props;
  const timeSlider = props.defaultValue;
  const [range, setRange] = useState(props.defaultValue);

  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const globalTimeSlider = useSelector((store: RootState) => store.mapviewState.timeSlider);
  const [marks, setMarks] = useState(props.defaultMarks);

  const gfwIntegratedStart = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedStart);

  const gfwIntegratedEnd = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedEnd);

  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);

  const glad2Start = useSelector((store: RootState) => store.appState.leftPanel.glad2Start);
  const glad2End = useSelector((store: RootState) => store.appState.leftPanel.glad2End);

  const raddAlertStart = useSelector((store: RootState) => store.appState.leftPanel.raddAlertStart);
  const raddAlertEnd = useSelector((store: RootState) => store.appState.leftPanel.raddAlertEnd);

  const treeCoverLossStart = useSelector((store: RootState) => store.appState.leftPanel.treeCoverLossStart);
  const treeCoverLossEnd = useSelector((store: RootState) => store.appState.leftPanel.treeCoverLossEnd);

  const themeColor = handleCustomColorTheme(customColorTheme);

  const formatDateString = (date: string) => {
    const newDate = new Date(date);
    return format(newDate, 'P');
  };

  const findObjectKeys = (marks: any, value: string) => {
    for (let key in marks) {
      const markLabel = marks[key].label;
      if (markLabel === value) {
        return Number(key);
      }
    }
    return null;
  };

  const generateDate = (year: number) => {
    return new Date(year, 0, 1).toLocaleString();
  };

  const handleSelectedDate = (keys: number[], marks: any) => {
    const startDate = marks[keys[0]]?.label;
    const endDate = marks[keys[1]]?.label;

    return { startDate, endDate };
  };

  useEffect(() => {
    const updateMarks = (newMaxYear: number): void => {
      const sliderMarks = { ...marks };
      const oneYearPrior = newMaxYear - 1;
      const twoYearsPrior = newMaxYear - 2;
      const oneYearLater = newMaxYear + 1;
      const twoYearsLater = newMaxYear + 2;

      if (sliderMarks[twoYearsPrior]) {
        sliderMarks[twoYearsPrior].style.display = 'none';
      }

      if (sliderMarks[oneYearPrior]) {
        sliderMarks[oneYearPrior].style.display = 'none';
      }

      if (sliderMarks[oneYearLater]) {
        sliderMarks[oneYearLater].style.display = 'none';
      }

      if (sliderMarks[twoYearsLater]) {
        sliderMarks[twoYearsLater].style.display = 'none';
      }

      if (sliderMarks[newMaxYear]) {
        sliderMarks[newMaxYear].style.display = 'block';
      }
    };

    const playSequence = (): void => {
      const newMaxYear = (range[1] += 1);

      setRange([range[0], range[1]]);
      updateMarks(newMaxYear);
      if (layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
        const { startDate, endDate } = handleSelectedDate([range[0], range[1]], props.defaultMarks);

        const dateStart = startDate;
        const dateEnd = endDate;
        //@ts-ignore
        const start = new Date(dateStart).getJulian();
        //@ts-ignore
        const end = new Date(dateEnd).getJulian();

        if (gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
          mapController.updateBaseTile(LAYER_IDS.GFW_INTEGRATED_ALERTS, [start, end], 'gfw');
        } else if (gfwLayer === LAYER_IDS.GLAD_ALERTS) {
          mapController.updateBaseTile(LAYER_IDS.GLAD_ALERTS, [start, end], 'julia');
        } else if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS) {
          mapController.updateBaseTile(LAYER_IDS.GLAD_S2_ALERTS, [start, end], 'julia');
        } else if (gfwLayer === LAYER_IDS.RADD_ALERTS) {
          mapController.updateBaseTile(LAYER_IDS.RADD_ALERTS, [start, end], 'julia');
        }
      } else {
        mapController.updateBaseTile(layerID, [range[0], newMaxYear]);
      }
    };

    const getValueByLayerId = LAYERS_DATE_RANGE.get(props.layerID);
    const defaultDateValue = getValueByLayerId?.length ? getValueByLayerId : globalTimeSlider;
    if (startTimeSlider && range[1] < defaultDateValue[1]) {
      (timeSliderRef as any).current = setInterval(playSequence, intervalSpeed);
    } else if (startTimeSlider && range[1] === timeSlider[1]) {
      setRange([props.min, props.max]);
      setMarks(props.defaultMarks);
    }

    return (): any => {
      clearInterval(timeSliderRef.current);
    };
  }, [startTimeSlider, range[1], timeSlider[1]]);

  useEffect(() => {
    const handleDateRangeValues = () => {
      let minValue = 0;
      let maxValue = 0;
      if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
        if (gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
          const startKey = findObjectKeys(props.defaultMarks, formatDateString(gfwIntegratedStart));
          const endKey = findObjectKeys(props.defaultMarks, formatDateString(gfwIntegratedEnd));

          minValue = startKey !== null ? startKey : props.min;
          maxValue = endKey !== null ? endKey : props.max;
        } else if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS) {
          const startKey = findObjectKeys(props.defaultMarks, formatDateString(glad2Start));
          const endKey = findObjectKeys(props.defaultMarks, formatDateString(glad2End));
          minValue = startKey !== null ? startKey : props.min;
          maxValue = endKey !== null ? endKey : props.max;
        } else if (gfwLayer === LAYER_IDS.GLAD_ALERTS) {
          const startKey = findObjectKeys(props.defaultMarks, formatDateString(gladStart));
          const endKey = findObjectKeys(props.defaultMarks, formatDateString(gladEnd));
          minValue = startKey !== null ? startKey : props.min;
          maxValue = endKey !== null ? endKey : props.max;
        } else if (gfwLayer === LAYER_IDS.RADD_ALERTS) {
          const startKey = findObjectKeys(props.defaultMarks, formatDateString(raddAlertStart));
          const endKey = findObjectKeys(props.defaultMarks, formatDateString(raddAlertEnd));
          minValue = startKey !== null ? startKey : props.min;
          maxValue = endKey !== null ? endKey : props.max;
        }
      } else if (props.layerID === LAYER_IDS.TREE_COVER_LOSS) {
        minValue = treeCoverLossStart;
        maxValue = treeCoverLossEnd;
      } else {
        minValue = props.min;
        maxValue = props.max;
      }

      return [minValue, maxValue];
    };
    const newRangeValues = handleDateRangeValues();
    setRange(newRangeValues);
  }, [
    gfwLayer,
    gfwIntegratedStart,
    gfwIntegratedEnd,
    glad2Start,
    glad2End,
    gladStart,
    gladEnd,
    raddAlertStart,
    raddAlertEnd,
  ]);

  const setSelectedRange = async (selectedRange: Array<number>) => {
    LAYERS_DATE_RANGE.set(props.layerID, selectedRange);
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(layerID, selectedRange);
    let convertStartDate;
    let convertEndDate;

    if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      const { startDate, endDate } = handleSelectedDate(selectedRange, marks);
      convertStartDate = startDate;
      convertEndDate = endDate;
    } else {
      convertStartDate = generateDate(selectedRange[0]);
      convertEndDate = generateDate(selectedRange[1]);
    }

    //@ts-ignore
    let start = new Date(convertStartDate).getJulian();
    //@ts-ignore
    let end = new Date(convertEndDate).getJulian();

    if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
    }
    if (props.layerID === LAYER_IDS.TREE_COVER_LOSS) {
      dispatch(setTreeCoverLossStart(selectedRange[0]));
      dispatch(setTreeCoverLossEnd(selectedRange[1]));
    }
    if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS && gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });
      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
    }
    if (gfwLayer === LAYER_IDS.GLAD_ALERTS && props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });
      dispatch(setGladStart(convertStartDate));
      dispatch(setGladEnd(convertEndDate));
    }
    if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS && props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setGlad2End(convertEndDate));
    }
    if (gfwLayer === LAYER_IDS.RADD_ALERTS && props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
      dispatch(setRaddAlertStart(convertStartDate));
      dispatch(setRaddAlertEnd(convertEndDate));
    } else {
      mapController.updateBaseTile(layerID, [selectedRange[0], selectedRange[1]]);
    }
  };

  const resetMarksByLayerId = () => {
    if (props.layerID === LAYER_IDS.TREE_COVER_LOSS) {
      const treeCoverLossDefaultMarks = generateDefaultMarks({ start: 2000, end: TREE_COVER_LOSS.max });
      setMarks(treeCoverLossDefaultMarks);
      return treeCoverLossDefaultMarks;
    } else if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      const dateRangeResult = generateGWFDateRange();
      setMarks(dateRangeResult.marks);
      return dateRangeResult.marks;
    } else {
      setMarks(props.defaultMarks);
      return props.defaultMarks;
    }
  };

  const playOrPauseTimeSlider = (startPlaying: boolean): any => {
    if (startPlaying) {
      const getRange = LAYERS_DATE_RANGE.get(props.layerID);
      if (getRange) {
        setRange([getRange[0], getRange[0]]);
      } else {
        setRange([props.defaultValue[0], props.defaultValue[0]]);
      }
      mapController.updateBaseTile(layerID, [globalTimeSlider[0], globalTimeSlider[0]]);

      setPlayButton(false);
      setStartTimeSlider(true);
    } else {
      resetMarksByLayerId();

      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
  };

  const handleTipFormatter = (val: any) => {
    if (
      props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS ||
      props.layerID === LAYER_IDS.TREE_COVER_LOSS ||
      gfwLayer === LAYER_IDS.GLAD_ALERTS ||
      gfwLayer === LAYER_IDS.GLAD_S2_ALERTS ||
      gfwLayer === LAYER_IDS.RADD_ALERTS
    ) {
      const label = props.defaultMarks[val]?.label;
      return label;
    }
    return val;
  };

  const getDateValue = () => {
    const getRange = LAYERS_DATE_RANGE.get(props.layerID);
    if (getRange?.length) {
      return [getRange[0], getRange[0]];
    }
    return range;
  };
  return (
    <div className="time-slider-container">
      {playButton ? (
        <button
          style={props.steps === 1 ? { color: customColorTheme } : { color: customColorTheme, visibility: 'hidden' }}
          onClick={(): void => playOrPauseTimeSlider(true)}
        >
          &#9658;
        </button>
      ) : (
        <button onClick={(): void => playOrPauseTimeSlider(false)}>&#10074;&#10074;</button>
      )}

      <SliderWithTooltip
        min={props.min}
        max={props.max}
        defaultValue={getDateValue()}
        value={range}
        allowCross={false}
        tipFormatter={(val) => handleTipFormatter(val)}
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip',
        }}
        disabled={!playButton}
        dots={dots}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: themeColor }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: `1px solid ${themeColor}`,
        }}
        included={props.included}
        // @ts-ignore
        // This disables marks in between date ranges
        step={props.steps}
        trackStyle={[{ backgroundColor: themeColor }]}
        className={playButton ? '' : 'playing'}
        onChange={(value: Array<number>) => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
