import * as React from 'react';
import { useState } from 'react';
import placeTileOnMap from './placeTileOnMap';
const checkForTileCloudRange = (tile: any, range: number[]): boolean => {
  const cloudScore = tile.attributes.cloud_score;
  return cloudScore >= range[0] && cloudScore <= range[1];
};

interface TileThumbnailsProps {
  tiles: any[];
  handleHover: (e: any, tile: any) => void;
  cloudCoverRange: number[];
  customColorTheme: string;
}
export const TileThumbnails = (props: TileThumbnailsProps): JSX.Element => {
  const [activeTile, setActiveTile] = useState<null | number>(null);
  const handleThumbnailClick = (e: any, tile: any, index: number): void => {
    setActiveTile(index);
    props.handleHover(e, props.tiles[index]);
    placeTileOnMap(tile);
  };

  const handleMouseLeave = (e: any, tile: any): void => {
    if (activeTile !== null) {
      props.handleHover(e, props.tiles[activeTile]);
    } else {
      props.handleHover(e, '');
    }
  };

  const tiles = props.tiles.map((tile: any, i: number) => {
    const thumbAvailable = tile.thumbUrl;
    const tileIsSelected = activeTile === i;
    const thumbIsInCloudRange = checkForTileCloudRange(
      tile,
      props.cloudCoverRange
    );

    const borderColor = tileIsSelected ? props.customColorTheme : 'transparent';
    return (
      <React.Fragment key={i}>
        {thumbIsInCloudRange && (
          <div
            className={tileIsSelected ? 'thumbnail active' : 'thumbnail'}
            style={{ border: `2px solid ${borderColor}` }}
            onMouseEnter={e => props.handleHover(e, tile)}
            onMouseLeave={e => handleMouseLeave(e, tile)}
            onClick={e => handleThumbnailClick(e, tile, i)}
          >
            {thumbAvailable ? (
              <img src={tile.thumbUrl} alt="thumbnail" />
            ) : (
              <div className="loader" style={{ width: 50, height: 50 }}>
                Loading....
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  });

  return <div className="thumb-container">{tiles}</div>;
};
