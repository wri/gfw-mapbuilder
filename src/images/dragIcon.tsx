import React from 'react';

export const DragIcon = ({
  title = 'drag-icon',
  titleId,
  height = '14',
  width = '14',
  viewBox = '0 0 19 32',
  fill = '#999',
  ...props
}) => {
  return (
    <svg
      {...props}
      preserveAspectRatio="xMidYMin meet"
      fill={fill}
      viewBox={viewBox}
      width={width}
      height={height}
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M3.2 12.8c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
      <path d="M16 12.8c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
      <path d="M3.2 0c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
      <path d="M16 0c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
      <path d="M3.2 25.6c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
      <path d="M16 25.6c1.767 0 3.2 1.433 3.2 3.2s-1.433 3.2-3.2 3.2c-1.767 0-3.2-1.433-3.2-3.2s1.433-3.2 3.2-3.2z"></path>
    </svg>
  );
};
