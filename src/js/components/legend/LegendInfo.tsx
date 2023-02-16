import React from 'react';

const LegendInfo = ({ info }: { info: string }) => {
  return (
    <div className="legend-info">
      <span>{info}</span>
    </div>
  );
};

export default LegendInfo;
