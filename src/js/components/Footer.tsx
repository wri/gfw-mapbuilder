import React, { useEffect, useRef } from 'react';
import Attribution from 'esri/widgets/Attribution';
import { mapController } from 'js/controllers/mapController';
import 'css/footer.scss';

const Footer = (): JSX.Element => {
  const attRef: any = useRef();
  useEffect(() => {
    new Attribution({
      view: mapController._mapview,
      container: attRef.current
    });
  }, [attRef]);
  return (
    <div className="footer-container">
      <div className="footer-links">
        <p>
          <a
            href="https://www.wri.org/about/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            WRI Privacy Policy
          </a>
        </p>
        <span> | </span>
        <p>
          <a
            href="https://www.globalforestwatch.org/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            GFW Terms of Service
          </a>
        </p>
      </div>
      <div className="attribution" ref={attRef}></div>
    </div>
  );
};

export default Footer;
