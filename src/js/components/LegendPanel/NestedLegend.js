import React from 'react';
import WebMapLegend from 'components/LegendPanel/WebMapLegend';

export const NestedLegend = ({ groupLabel, layerGroup, activeLayers }) => {

  const groupVisible = layerGroup.some(l => l.visible);


  return (
    <div className={`nested-legend-group ${groupVisible ? '' : 'hidden'}`}>
      <div className='nested-group-label'><strong>{groupLabel}</strong></div>
      {layerGroup.map(l => {
        return <WebMapLegend
          key={l.id}
          url={l.esriLayer.url}
          visibility={activeLayers.indexOf(l.id) > -1}
          visibleLayers={activeLayers}
          layerSubIndex={1}
          layerId={l.id}
          />;
      })}
    </div>
  );
};

export default NestedLegend;
