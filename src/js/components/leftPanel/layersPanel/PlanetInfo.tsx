import * as React from 'react';

//@ts-ignore
import PlanetLogo from '../../../../images/planet.svg';

const PlanetInfo = (): JSX.Element => {
  return (
    <div className="canopy-density-container" style={{ margin: 15 }}>
      <img src={PlanetLogo} style={{ width: 140 }} alt="planet-logo" />
      <div>
        <p>Planet Mosaics: © Planet Labs Inc.</p>
        Mosaics are also available to download from{' '}
        <a target="_blank" href="https://www.planet.com/nicfi/">
          https://www.planet.com/nicfi
        </a>
      </div>
    </div>
  );
};

export default PlanetInfo;
