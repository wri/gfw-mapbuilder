import * as React from 'react';

const checkForTileCloudRange = (tile: any, range: number[]): boolean => {
  const cloudScore = tile.attributes.cloud_score;
  return cloudScore >= range[0] && cloudScore <= range[1];
};

interface TileThumbnailsProps {
  tiles: any[];
  handleHover: (e: any, tile: any) => void;
  cloudCoverRange: number[];
}
export const TileThumbnails = (props: TileThumbnailsProps): JSX.Element => {
  console.log(props.cloudCoverRange);
  const tiles = props.tiles
    .filter((tile: any) => checkForTileCloudRange(tile, props.cloudCoverRange))
    .map((tile: any, i: number) => {
      const thumbAvailable = tile.thumbUrl;
      return (
        <div
          className="thumbnail"
          key={i}
          onMouseEnter={e => props.handleHover(e, tile)}
          onMouseLeave={e => props.handleHover(e, '')}
        >
          {thumbAvailable ? (
            <img src={tile.thumbUrl} alt="thumbnail" />
          ) : (
            <div className="loader" style={{ width: 50, height: 50 }}>
              Loading....
            </div>
          )}
        </div>
      );
    });

  return <div className="thumb-container">{tiles}</div>;
};
