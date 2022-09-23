import { mapController } from '../controllers/mapController';
import { LayerFactory } from './LayerFactory';
import {
  setGladEnd,
  setGladStart,
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
} from '../store/appState/actions';
import store from '../store';

class TimeSliderUtils {
  __updateMarks = (newMaxYear: number, sliderMarks: any): void => {
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

    return { ...sliderMarks };
  };

  playSequence = (newMaxYear: number, sliderMarks: any, layerID: string, range: any): void => {
    this.__updateMarks(newMaxYear, sliderMarks);
    mapController.updateBaseTile(layerID, [range[0], newMaxYear]);
  };

  convertDate = (value: number, timesliderLayerProperties: any) => {
    const nextStartDate = new Date(timesliderLayerProperties.min || timesliderLayerProperties.max);
    nextStartDate.setDate(value);
    return new Date(nextStartDate.getTime() - nextStartDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  };

  setSelectedRange = async (selectedRange: Array<number>, timesliderLayerProperties: any, props: any) => {
    const allAvailableLayers = store.getState().mapviewState.allAvailableLayers;
    const gfwLayer = store.getState().appState.leftPanel.integratedAlertLayer;
    const convertStartDate = this.convertDate(selectedRange[0], timesliderLayerProperties);
    const convertEndDate = this.convertDate(selectedRange[1], timesliderLayerProperties);
    //@ts-ignore
    const end = new Date(convertEndDate).getJulian();
    //@ts-ignore
    const start = new Date(convertStartDate).getJulian();
    if (props.layerID === 'GFW_INTEGRATED_ALERTS' && gfwLayer === 'GFW_INTEGRATED_ALERTS') {
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
      mapController._map?.remove(gfwIntegratedLayerOld);

      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layer);
      gfwIntegratedLayerNew.gfwjulianFrom = convertStartDate;
      gfwIntegratedLayerNew.gfwjulianTo = convertEndDate;
      mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);

      store.dispatch(setIntegratedAlertLayerStart(convertStartDate));
      store.dispatch(setIntegratedAlertLayerEnd(convertEndDate));
    } else {
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === gfwLayer);
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

      store.dispatch(setGladStart(convertStartDate));
      store.dispatch(setGladEnd(convertEndDate));
      return selectedRange;
    }
  };
}

const timeSliderUtils = new TimeSliderUtils();
export default timeSliderUtils;
