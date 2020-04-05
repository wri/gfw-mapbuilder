import * as React from 'react';

interface TileThumbnailsProps {
  tiles: any[];
}
export const TileThumbnails = (props: TileThumbnailsProps): JSX.Element => {
  const tiles = props.tiles.map((tile: any, i: number) => {
    const thumbAvailable = tile.thumbUrl;
    return (
      <div className="thumbnail" key={i}>
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
