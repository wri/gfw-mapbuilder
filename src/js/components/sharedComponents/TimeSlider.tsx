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
}

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID } = props;
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
      if (layerID === 'GFW_INTEGRATED_ALERTS') {
        const dateStart = new Date(range[0], 0, 0).toLocaleString();
        const dateEnd = new Date(newMaxYear, 0, 0).toLocaleString();
        //@ts-ignore
        const start = new Date(dateStart).getJulian();
        //@ts-ignore
        const end = new Date(dateEnd).getJulian();

        if (gfwLayer === 'GFW_INTEGRATED_ALERTS') {
          mapController.updateBaseTile('GFW_INTEGRATED_ALERTS', [start, end], 'gfw');
        } else if (gfwLayer === 'GLAD_ALERTS') {
          mapController.updateBaseTile('GLAD_ALERTS', [start, end], 'julia');
        } else if (gfwLayer === 'GLAD_S2_ALERTS') {
          mapController.updateBaseTile('GLAD_S2_ALERTS', [start, end], 'julia');
        } else if (gfwLayer === 'RADD_ALERTS') {
          mapController.updateBaseTile('RADD_ALERTS', [start, end], 'julia');
        }
      } else {
        mapController.updateBaseTile(layerID, [range[0], newMaxYear]);
      }
    };

    if (startTimeSlider && range[1] !== timeSlider[1]) {
      (timeSliderRef as any).current = setInterval(playSequence, 1000);
    } else if (startTimeSlider && range[1] === timeSlider[1]) {
      setRange([range[0], range[0]]);
      setMarks(props.defaultMarks);
    }

    return (): any => {
      clearInterval(timeSliderRef.current);
    };
  }, [startTimeSlider, range[1], timeSlider[1]]);

  const getYearFromStringDate = (date: string): number => {
    return new Date(date).getFullYear();
  };

  useEffect(() => {
    const handleDateRangeValues = () => {
      let minValue = 0;
      let maxValue = 0;
      if (props.layerID === 'GFW_INTEGRATED_ALERTS') {
        if (gfwLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
          minValue = getYearFromStringDate(gfwIntegratedStart);
          maxValue = getYearFromStringDate(gfwIntegratedEnd);
        } else if (gfwLayer === LAYER_IDS.GLAD_S2_ALERTS) {
          minValue = getYearFromStringDate(glad2Start);
          maxValue = getYearFromStringDate(glad2End);
        } else if (gfwLayer === LAYER_IDS.GLAD_ALERTS) {
          minValue = getYearFromStringDate(gladStart);
          maxValue = getYearFromStringDate(gladEnd);
        } else if (gfwLayer === LAYER_IDS.RADD_ALERTS) {
          minValue = getYearFromStringDate(raddAlertStart);
          maxValue = getYearFromStringDate(raddAlertEnd);
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

  const generateDate = (year: number) => {
    return new Date(year, 0, 1).toLocaleString();
  };
  const setSelectedRange = async (selectedRange: Array<number>) => {
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(layerID, selectedRange);

    const convertStartDate = generateDate(selectedRange[0]);
    const convertEndDate = generateDate(selectedRange[1]);

    //@ts-ignore
    const start = new Date(convertStartDate).getJulian();
    //@ts-ignore
    const end = new Date(convertEndDate).getJulian();

    if (props.layerID === 'GFW_INTEGRATED_ALERTS') {
      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setGladStart(convertStartDate));
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setRaddAlertStart(convertStartDate));

      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
      dispatch(setGladEnd(convertEndDate));
      dispatch(setGlad2End(convertEndDate));
      dispatch(setRaddAlertEnd(convertEndDate));
    }

    if (props.layerID === 'GFW_INTEGRATED_ALERTS' && gfwLayer === 'GFW_INTEGRATED_ALERTS') {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

      console.log('GFW_INTEGRATED_ALERTS');
      dispatch(setIntegratedAlertLayerStart(convertStartDate));
      dispatch(setIntegratedAlertLayerEnd(convertEndDate));
    } else if (gfwLayer === 'GLAD_ALERTS') {
      console.log('GLAD_ALERTS');
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });
      dispatch(setGladStart(convertStartDate));
      dispatch(setGladEnd(convertEndDate));
    } else if (gfwLayer === 'GLAD_S2_ALERTS') {
      console.log('GLAD_S2_ALERTS');
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
      dispatch(setGlad2Start(convertStartDate));
      dispatch(setGlad2End(convertEndDate));
    } else if (gfwLayer === 'RADD_ALERTS') {
      console.log('RADD_ALERTS');
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
      setRange(timeSlider);

      setMarks(props.defaultMarks);
      if (layerID === 'GFW_INTEGRATED_ALERTS') {
        if (gfwLayer === 'GFW_INTEGRATED_ALERTS') {
          mapController.updateBaseTile('GFW_INTEGRATED_ALERTS', timeSlider);
        } else if (gfwLayer === 'GLAD_ALERTS') {
          mapController.updateBaseTile('GLAD_ALERTS', timeSlider);
        } else if (gfwLayer === 'GLAD_S2_ALERTS') {
          mapController.updateBaseTile('GLAD_S2_ALERTS', timeSlider);
        } else if (gfwLayer === 'RADD_ALERTS') {
          mapController.updateBaseTile('RADD_ALERTS', timeSlider);
        }
      } else {
        mapController.updateBaseTile(layerID, timeSlider);
      }
      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
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
        defaultValue={props.defaultValue}
        value={range}
        allowCross={false}
        tipFormatter={(val: any): any => val}
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip',
        }}
        dots={true}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: customColorTheme }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: `1px solid ${customColorTheme}`,
        }}
        included={props.included}
        // @ts-ignore
        // This disables marks in between date ranges
        step={props.steps}
        trackStyle={[{ backgroundColor: customColorTheme }]}
        className={playButton ? '' : 'playing'}
        onChange={(value: Array<number>) => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
