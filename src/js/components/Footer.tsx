import React, { useEffect, useRef } from 'react';
import Attribution from 'esri/widgets/Attribution';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import { mapController } from 'js/controllers/mapController';
import 'css/footer.scss';

const Footer = (): JSX.Element => {
  const footerLinks = useSelector(
    (store: RootState) => store.appSettings.footerLinks
  );

  const attRef: any = useRef();
  useEffect(() => {
    new Attribution({
      view: mapController._mapview,
      container: attRef.current
    });
  }, [attRef]);

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
      <div className="footer-links">{footerLinksItems}</div>
      <div className="attribution" ref={attRef}></div>
    </div>
  );
};

export default Footer;
