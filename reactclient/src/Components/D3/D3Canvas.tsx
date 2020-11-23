import React from 'react';
import BarChart from './BarChart';

interface ID3CanvasStyles {
  height: string,
  width: string,
  border: string
}

const canvasStyle: ID3CanvasStyles = {
  height: '400px',
  width: '600px',
  border: '2px solid gold',
}

const D3Container: React.FC = (): JSX.Element => {
  return (
    <svg style={canvasStyle}>
      <BarChart />
    </svg>
  );
}

export default D3Container;