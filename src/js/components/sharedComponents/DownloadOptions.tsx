import * as React from 'react';
import '../../../css/report.scss';

interface DownloadOptionsProps {
  csv: string;
  chartDownTitle: string;
  base64ChartURL: string;
  closeCB?: any;
  report: boolean;
}

export const DownloadOptions = (props: DownloadOptionsProps): JSX.Element => {
  const ref = React.useRef(null);

  const clickListener = React.useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        props.closeCB(); // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [ref.current]
  );

  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        props.report
          ? 'download-option-container report-downloads'
          : 'download-option-container'
      }
    >
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
