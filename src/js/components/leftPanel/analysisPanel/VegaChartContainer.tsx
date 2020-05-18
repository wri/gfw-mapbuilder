import * as React from 'react';
import { useRef } from 'react';
import { generateAndAttachVegaChart } from './VegaChartCreator';
import Measure from 'react-measure';

interface ChartProps {
  spec: any | null;
  language: string;
  baseConfig: any;
  report?: boolean;
  chartType?: string;
  sendBackURL?: (pngString: string) => void;
}

function createChartWrapperStyle(chartType?: string): object {
  switch (chartType) {
    case 'badge':
      return {
        maxWidth: '30rem',
        width: '100%',
        margin: '1rem auto'
      };
    case 'pie':
      return {
        maxWidth: '290px',
        width: '100%',
        margin: '1rem auto'
      };
    case 'line':
      return {
        maxWidth: '60rem',
        width: '100%',
        margin: '1rem auto'
      };
    case 'bar':
      return {
        maxWidth: '60rem',
        width: '100%',
        margin: '1rem auto'
      };
    default:
      return {
        maxWidth: '60rem',
        width: '100%',
        height: '300px',
        margin: '1rem auto'
      };
  }
}
const Chart = (props: ChartProps): JSX.Element => {
  const chartRef = useRef(null);
  const { spec, language, report, chartType } = props;
  const [dimensions, setDimensions] = React.useState<undefined | any>({
    dimensions: { width: -1, height: -1 }
  });

  function callback(pngString: string): void {
    if (props.sendBackURL) {
      props.sendBackURL(pngString);
    }
  }
  React.useEffect(() => {
    if (!spec) return;
    //In case of report, we tell chart to resize appropriately
    if (report) {
      if (!spec.signals) {
        spec.signals = [];
      }
      spec.autosize = {
        type: 'fit',
        resize: true
      };

      const resizeWidthSignal = {
        name: 'width',
        update: 'containerSize()[0]*0.95',
        value: '',
        on: [
          {
            events: {
              source: 'window',
              type: 'resize'
            },
            update: 'containerSize()[0]*0.95'
          }
        ]
      };
      spec.signals.push(resizeWidthSignal);
    }

    generateAndAttachVegaChart(
      props.spec,
      chartRef.current,
      props.language,
      props.baseConfig,
      props.report,
      callback
    );
  }, [chartRef, spec, language]);

  const chartWrapperStyle = createChartWrapperStyle(chartType);

  function renderChartRef(): JSX.Element {
    if (report) {
      return (
        <Measure
          bounds
          onResize={(contentRec): void => {
            setDimensions({ dimensions: contentRec.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef} style={chartWrapperStyle}>
              <div
                className="temptemp"
                style={{
                  width: dimensions.dimensions.width
                }}
                ref={chartRef}
              ></div>
            </div>
          )}
        </Measure>
      );
    } else {
      return (
        <div
          className="temptemp"
          style={{
            width: dimensions.dimensions.width,
            height: dimensions.dimensions.height
          }}
          ref={chartRef}
        ></div>
      );
    }
  }

  return <>{renderChartRef()}</>;
};

export default Chart;
