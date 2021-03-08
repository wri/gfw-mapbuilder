import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../js/store/index';
import { mapController } from '../../js/controllers/mapController';

import '../../css/footer.scss';

const Footer = (): JSX.Element => {
  const footerLinks = useSelector(
    (store: RootState) => store.appSettings.footerLinks
  );
  const attRef = useRef(null);
  const scaleRef = useRef(null);
  useEffect(() => {
    mapController.addScaleBar(scaleRef);
    mapController.addMapAttribution(attRef);
  }, []);

  const footerLinksItems = footerLinks.map((item, i: number) => {
    return (
      <p key={i}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.label}
        </a>
      </p>
    );
  });

  return (
    <div className="footer-container">
      <div className="scaleBar" ref={scaleRef}></div>
      <div className="footer-links">{footerLinksItems}</div>
      <div className="attribution" ref={attRef}></div>
    </div>
  );
};

export default Footer;
