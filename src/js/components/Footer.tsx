import React from 'react';

import 'css/footer.scss';

const Footer = (): JSX.Element => {
  return (
    <div className="footer-container">
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
  );
};

export default Footer;
