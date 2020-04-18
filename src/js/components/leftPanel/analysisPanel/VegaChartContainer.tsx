import * as React from 'react';
import { useRef } from 'react';
import { generateAndAttachVegaChart } from './VegaChartCreator';

interface ChartProps {
  spec: object | null;
  language: string;
  report?: boolean;
}
const Chart = (props: ChartProps): JSX.Element => {
  const chartRef = useRef(null);
  React.useEffect(() => {
    generateAndAttachVegaChart(
      props.spec,
      chartRef.current,
      props.language,
      props.report
    );
  }, [chartRef, props.spec, props.language]);

  return <div ref={chartRef}></div>;
};

export default Chart;
