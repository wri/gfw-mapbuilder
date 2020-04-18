import * as React from 'react';
import { useRef } from 'react';
import { generateAndAttachVegaChart } from './VegaChartCreator';
import Measure from 'react-measure';

interface ChartProps {
  spec: any | null;
  language: string;
  report?: boolean;
  chartType?: string;
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
  console.log(chartType);
  const [dimensions, setDimensions] = React.useState<undefined | any>({
    dimensions: { width: -1, height: -1 }
  });
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
      props.report
    );
  }, [chartRef, spec, language]);
  console.log(dimensions.dimensions.width);

  const chartWrapperStyle = createChartWrapperStyle(chartType);

  return (
    <Measure
      bounds
      onResize={(contentRec): void => {
        console.log(contentRec);
        setDimensions({ dimensions: contentRec.bounds });
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} style={chartWrapperStyle}>
          <div
            className="temptemp"
            style={{ width: dimensions.dimensions.width }}
            ref={chartRef}
          ></div>
        </div>
      )}
    </Measure>
  );
};

export default Chart;
