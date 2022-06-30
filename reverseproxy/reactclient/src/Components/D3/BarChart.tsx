import React, { 
  useEffect, 
  useRef,
  useState
} from 'react'
import * as d3 from 'd3';

interface IBarChart {
  clientMessage: number[];
}

const BarChart: React.FC<IBarChart> = (props: IBarChart): JSX.Element => {
  const [drawn, setDrawn] = useState<boolean>(false);
  const ref = useRef(null);

  const { clientMessage } = props;

  useEffect(() => {
    if(clientMessage.length > 0) {
      drawInitialBarChart(ref, clientMessage, drawn);
      setDrawn(true);
    }
  }, [clientMessage, drawn]);

  return <svg ref={ref} />;
}

function drawInitialBarChart(
    ref: React.MutableRefObject<null>, 
    data: number[], 
    drawn: boolean
  ) {
  const canvasHeight: number = 200;
  const canvasWidth: number = 300;
  const scale: number = 10;

  if(!drawn) {
      const svgCanvas = d3.select(ref.current)
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight);

      svgCanvas.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 40)
        .attr('height', (datapoint) => datapoint * scale)
        .attr('fill', 'orange')
        .attr('x', (datapoint, iteration) => iteration * 45)
        .attr('y', (datapoint) => canvasHeight - datapoint * scale);
    } else {
      const svgCanvas = d3.select(ref.current);

      svgCanvas.selectAll('rect')
        .data(data)
        .attr('width', 40)
        .attr('height', (datapoint) => datapoint * scale)
        .attr('fill', 'orange')
        .attr('x', (datapoint, iteration) => iteration * 45)
        .attr('y', (datapoint) => canvasHeight - datapoint * scale);
    }
}

export default BarChart;