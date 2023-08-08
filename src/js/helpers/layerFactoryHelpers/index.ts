import { TreeMosaicLayerTypes } from 'src/js/store/appState/types';

export interface GetUrlParams {
  type: TreeMosaicLayerTypes;
  hectareValue: number;
}

export const getUrl = ({ type, hectareValue }: GetUrlParams) => {
  if (type === 'hectare') {
    return `https://tiles.globalforestwatch.org/wri_tropical_tree_cover/v2020/ttcd_${hectareValue}/{z}/{x}/{y}.png`;
  } else {
    return 'https://tiles.globalforestwatch.org/wri_trees_in_mosaic_landscapes/v20220922/tcd_40/{z}/{x}/{y}.png';
  }
};
