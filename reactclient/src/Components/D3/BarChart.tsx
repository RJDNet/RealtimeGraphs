import React, { 
  useEffect, 
  useRef 
} from 'react'
import * as d3 from 'd3';

const data = [2, 4, 2, 6, 8, 15];

const BarChart: React.FC = (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    drawBarChart(ref, data);
  });

  return <svg ref={ref}></svg>;
}

function drawBarChart(ref: React.MutableRefObject<null>, data: number[]) {
  const canvasHeight: number = 400;
  const canvasWidth: number = 600;
  const scale: number = 20;

  const svgCanvas = d3.select(ref.current)
    .append('svg')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);

  svgCanvas.selectAll('rect')
    .data(data).enter()
    .append('rect')
    .attr('width', 40)
    .attr('height', (datapoint) => datapoint * scale)
    .attr('fill', 'orange')
    .attr('x', (datapoint, iteration) => iteration * 45)
    .attr('y', (datapoint) => canvasHeight - datapoint * scale);
}

export default BarChart;