import {
  MAP_ERROR,
  MAP_READY,
  USER_SUBSCRIPTIONS,
  ALL_AVAILABLE_LAYERS,
  SET_ACTIVE_FEATURES,
  SET_ACTIVE_FEATURE_INDEX,
  SET_ACTIVE_BASEMAP,
  SET_TIME_SLIDER,
  SET_DOCUMENTS,
  CHANGE_MAP_SCALE,
  CHANGE_MAP_CENTER_COORDINATES,
  SET_LAYERS_LOADING,
  SET_USER_COORDINATES,
  SET_SELECTED_BASEMAP_INFO,
  MapviewState,
} from './types';

export function isMapReady(payload: MapviewState['isMapReady']) {
  return {
    type: MAP_READY as typeof MAP_READY,
    payload,
  };
}

export function mapError(payload: MapviewState['loadError']) {
  return {
    type: MAP_ERROR as typeof MAP_ERROR,
    payload,
  };
}

export function allAvailableLayers(payload: MapviewState['allAvailableLayers']) {
  return {
    type: ALL_AVAILABLE_LAYERS as typeof ALL_AVAILABLE_LAYERS,
    payload,
  };
}

export function setActiveFeatures(payload: MapviewState['activeFeatures']) {
  return {
    type: SET_ACTIVE_FEATURES as typeof SET_ACTIVE_FEATURES,
    payload,
  };
}

export function setActiveFeatureIndex(payload: MapviewState['activeFeatureIndex']) {
  return {
    type: SET_ACTIVE_FEATURE_INDEX as typeof SET_ACTIVE_FEATURE_INDEX,
    payload,
  };
}

export function setSelectedBasemap(basemapID: MapviewState['activeBasemap']) {
  return {
    type: SET_ACTIVE_BASEMAP as typeof SET_ACTIVE_BASEMAP,
    payload: basemapID,
  };
}

export function setTimeSlider(timeSlider: MapviewState['timeSlider']) {
  return {
    type: SET_TIME_SLIDER as typeof SET_TIME_SLIDER,
    payload: timeSlider,
  };
}

export function changeMapScale(scale: MapviewState['scale']) {
  return {
    type: CHANGE_MAP_SCALE as typeof CHANGE_MAP_SCALE,
    payload: scale,
  };
}

export function changeMapCenterCoordinates(mapCenterCoordinates: MapviewState['mapCenterCoordinates']) {
  return {
    type: CHANGE_MAP_CENTER_COORDINATES as typeof CHANGE_MAP_CENTER_COORDINATES,
    payload: mapCenterCoordinates,
  };
}

export function setLayersLoading(mapCenterCoordinates: MapviewState['layersLoading']) {
  return {
    type: SET_LAYERS_LOADING as typeof SET_LAYERS_LOADING,
    payload: mapCenterCoordinates,
  };
}

export function setUserCoordinates(payload: MapviewState['userCoordinates']) {
  return {
    type: SET_USER_COORDINATES as typeof SET_USER_COORDINATES,
    payload,
  };
}

export function setDocuments(payload: MapviewState['documents']) {
  return {
    type: SET_DOCUMENTS as typeof SET_DOCUMENTS,
    payload,
  };
}

export function setSelectedBasemapInfo(payload: MapviewState['selectedBasedMapInfo']) {
  return {
    type: SET_SELECTED_BASEMAP_INFO as typeof SET_SELECTED_BASEMAP_INFO,
    payload,
  };
}
