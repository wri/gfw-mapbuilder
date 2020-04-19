import * as React from 'react';
import 'css/report.scss';

interface DownloadOptionsProps {
  csv: string;
  chartDownTitle: string;
  base64ChartURL: string;
}

export const DownloadOptions = (props: DownloadOptionsProps): JSX.Element => {
  return (
    <div className="download-option-container">
      <a
        className="download-option"
        href={props.base64ChartURL}
        download={props.chartDownTitle}
      >
        <span className="download-option-label">Download PNG</span>
      </a>
      {props.csv !== '' && (
        <a
          className="download-option"
          href={props.csv}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <span className="download-option-label">Download CSV</span>
        </a>
      )}
    </div>
  );
};
