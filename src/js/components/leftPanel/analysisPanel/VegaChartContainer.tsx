import * as React from 'react';
import { useRef } from 'react';
import { generateAndAttachVegaChart } from './VegaChartCreator';

interface ChartProps {
  spec: object | null;
}
const Chart = (props: ChartProps): JSX.Element => {
  const chartRef = useRef(null);
  React.useEffect(() => {
    generateAndAttachVegaChart(props.spec, chartRef.current);
  }, [chartRef, props.spec]);

  return <div ref={chartRef}></div>;
};

export default Chart;
