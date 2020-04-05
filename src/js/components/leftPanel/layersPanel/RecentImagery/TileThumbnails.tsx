import * as React from 'react';

interface TileThumbnailsProps {
  tiles: any[];
}
export const TileThumbnails = (props: TileThumbnailsProps): JSX.Element => {
  console.log(props.tiles);
  const tiles = props.tiles.map((tile: any, i: number) => (
    <div className="thumbnail" key={i}>
      <img src={tile.thumbUrl} alt="thumbnail" />
    </div>
  ));

  return <div className="thumb-container">{tiles}</div>;
};
