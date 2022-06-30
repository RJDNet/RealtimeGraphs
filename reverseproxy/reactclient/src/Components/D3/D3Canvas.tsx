import React from 'react';
import BarChart from './BarChart';

interface ID3CanvasStyles {
  height: string;
  minWidth: string;
  border: string;
  margin: string;
}

interface ID3Canvas {
  clientMessage: number[][];
}

const canvasStyle: ID3CanvasStyles = {
  height: '200px',
  minWidth: '300px',
  border: '2px solid gold',
  margin: '10px'
}

const D3Canvas: React.FC<ID3Canvas> = (props: ID3Canvas): JSX.Element => {
  const { clientMessage } = props;

  return (
    <div>
      {clientMessage.map((graph: number[], i: number) => {
        return (
            <svg key={i} style={canvasStyle}>
              <BarChart clientMessage={graph} />
            </svg>
          );
        })
      }
    </div>
  );
}

export default D3Canvas;