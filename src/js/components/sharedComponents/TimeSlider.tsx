import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from '../../controllers/mapController';

import { setTimeSlider } from '../../store/mapview/actions';

import { RootState } from '../../store';
import { LayerFactory } from '../../helpers/LayerFactory';
import {
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setGladEnd,
  setGladStart,
  setGlad2Start,
  setGlad2End,
  setRaddAlertStart,
  setRaddAlertEnd,
} from '../../store/appState/actions';
import { LAYER_IDS } from '../../../../configs/layer-config';

const SliderWithTooltip = createSliderWithTooltip(Range);
import { format } from 'date-fns';
import { handleCustomColorTheme } from '../../../utils';
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
  const [marks, setMarks] = useState(props.defaultMarks);

  const gfwIntegratedStart = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedStart);

  const gfwIntegratedEnd = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedEnd);

  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);

  const glad2Start = useSelector((store: RootState) => store.appState.leftPanel.glad2Start);
  const glad2End = useSelector((store: RootState) => store.appState.leftPanel.glad2End);

  const raddAlertStart = useSelector((store: RootState) => store.appState.leftPanel.raddAlertStart);
  const raddAlertEnd = useSelector((store: RootState) => store.appState.leftPanel.raddAlertEnd);

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

      setRange([range[0], newMaxYear]);
      updateMarks(newMaxYear);
      if (layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
        const { startDate, endDate } = handleSelectedDate([range[0], newMaxYear], props.defaultMarks);

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

    if (startTimeSlider && range[1] !== timeSlider[1]) {
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

  const resetIntegratedAlertsDates = () => {
    if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      const { startDate, endDate } = handleSelectedDate([props.min, props.max], props.defaultMarks);

      const convertStartDate = startDate;
      const convertEndDate = endDate;

      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setGladStart(convertStartDate));
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setRaddAlertStart(convertStartDate));

      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
      dispatch(setGladEnd(convertEndDate));
      dispatch(setGlad2End(convertEndDate));
      dispatch(setRaddAlertEnd(convertEndDate));
    }
  };

  const setSelectedRange = async (selectedRange: Array<number>) => {
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
      dispatch(setGladStart(convertStartDate));
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setRaddAlertStart(convertStartDate));

      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
      dispatch(setGladEnd(convertEndDate));
      dispatch(setGlad2End(convertEndDate));
      dispatch(setRaddAlertEnd(convertEndDate));
    }

    if (props.layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS && gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
    } else if (gfwLayer === LAYER_IDS.GLAD_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });
      dispatch(setGladStart(convertStartDate));
      dispatch(setGladEnd(convertEndDate));
    } else if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setGlad2End(convertEndDate));
    } else if (gfwLayer === LAYER_IDS.RADD_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
      dispatch(setRaddAlertStart(convertStartDate));
      dispatch(setRaddAlertEnd(convertEndDate));
    } else {
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === layerID);
      const gladLayerOld: any = mapController._map!.findLayerById(gfwLayer);
      const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
      mapController._map?.remove(gladLayerOld);
      const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
      gladLayerNew.julianFrom = start;
      gladLayerNew.julianTo = end;
      gladLayerNew.id = gfwLayer;
      mapController._map?.add(gladLayerNew, gladIndex);
      const selectedLayer = mapController._map!.findLayerById(gfwLayer);
      selectedLayer.visible = true;

      dispatch(setGladStart(convertStartDate));
      dispatch(setGladEnd(convertEndDate));
    }
  };

  const playOrPauseTimeSlider = (startPlaying: boolean): any => {
    if (startPlaying) {
      setRange([timeSlider[0], timeSlider[0]]);
      mapController.updateBaseTile(layerID, [timeSlider[0], timeSlider[0]]);

      setPlayButton(false);
      setStartTimeSlider(true);
    } else {
      // * NOTE: stops & resets time slider
      const { startDate, endDate } = handleSelectedDate(timeSlider, props.defaultMarks);

      //@ts-ignore
      let start = new Date(startDate).getJulian();
      //@ts-ignore
      let end = new Date(endDate).getJulian();

      setRange(timeSlider);
      resetIntegratedAlertsDates();

      setMarks(props.defaultMarks);
      if (layerID === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
        if (gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
          mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });
        } else if (gfwLayer === LAYER_IDS.GLAD_ALERTS) {
          mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });
        } else if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS) {
          mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
        } else if (gfwLayer === LAYER_IDS.RADD_ALERTS) {
          mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
        }
      } else {
        mapController.updateBaseTile(layerID, timeSlider);
      }
      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
  };

  const handleTipFormatter = (val: any) => {
    if (props.layerID !== LAYER_IDS.GFW_INTEGRATED_ALERTS) return val;
    const label = props.defaultMarks[val]?.label;
    return label;
  };

  console.log('this one is defnintely running', props);
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
        defaultValue={props.defaultValue}
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
