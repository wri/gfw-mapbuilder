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
  sendError?: (error: string) => void;
}

function createChartWrapperStyle(chartType?: string): object {
  switch (chartType) {
    case 'badge':
      return {
        maxWidth: '30rem',
        minHeight: '280px',
        maxHeight: '300px',
        width: '100%',
        margin: '1rem auto',
      };
    case 'pie':
      return {
        maxWidth: '290px',
        minHeight: '280px',
        maxHeight: '300px',
        width: '100%',
        margin: '1rem auto',
      };
    case 'line':
      return {
        maxWidth: '60rem',
        minHeight: '280px',
        maxHeight: '300px',
        width: '100%',
        margin: '1rem auto',
      };
    case 'bar':
      return {
        maxWidth: '60rem',
        minHeight: '280px',
        maxHeight: '300px',
        width: '100%',
        margin: '1rem auto',
      };
    default:
      return {
        maxWidth: '60rem',
        minHeight: '280px',
        maxHeight: '300px',
        width: '100%',
        margin: '1rem auto',
      };
  }
}
const Chart = (props: ChartProps): JSX.Element => {
  const chartRef = useRef(null);
  const { spec, language, chartType } = props;
  const [dimensions, setDimensions] = React.useState<undefined | any>({
    dimensions: { width: -1, height: -1 },
  });

  function callback(payload: any): void {
    if (props.sendError && payload.error) {
      props.sendError(payload.error);
    }

    if (props.sendBackURL) {
      props.sendBackURL(payload);
    }
  }
  React.useEffect(() => {
    if (!spec) return;
    //In case of report, we tell chart to resize appropriately
    if (!spec.signals) {
      spec.signals = [];
    }

    // spec.autosize = {
    //   type: 'fit',
    //   resize: true
    // };

    const resizeWidthSignal = {
      name: 'width',
      update: 'containerSize()[0]*0.95',
      value: '',
      on: [
        {
          events: {
            source: 'window',
            type: 'resize',
          },
          update: 'containerSize()[0]*0.95',
        },
      ],
    };
    spec.signals.push(resizeWidthSignal);

    generateAndAttachVegaChart(props.spec, chartRef.current, props.language, props.baseConfig, props.report, callback);
  }, [chartRef, spec, language]);

  const chartWrapperStyle = createChartWrapperStyle(chartType);
  function renderChartRef(): JSX.Element {
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
              className="canvas-chart-wrapper"
              style={{
                width: dimensions.dimensions.width,
              }}
              ref={chartRef}
            ></div>
          </div>
        )}
      </Measure>
    );
  }

  return <>{renderChartRef()}</>;
};

export default Chart;
