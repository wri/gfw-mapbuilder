import React, { useState } from 'react';

const WMSImageWithPlaceholder = ({ src, alt, errorMessage }) => {
  const [imageError, setImageError] = useState(false);

  function handleImageError() {
    setImageError(true);
  }

  return (
    <React.Fragment>
      {!imageError && <img src={src} alt={alt} onError={handleImageError} />}
      {imageError && <span className="wms-legend-error-message">{errorMessage}</span>}
    </React.Fragment>
  );
};
export default WMSImageWithPlaceholder;
