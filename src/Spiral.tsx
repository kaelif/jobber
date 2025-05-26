import React from 'react';
import { createSpiral } from './spiral';

interface SpiralProps {
  size: number;
}

const Spiral: React.FC<SpiralProps> = ({ size }) => {
  const matrix = createSpiral(size);

  return (
    <div>
      <p>Size: {size}x{size}</p>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td
                  key={j}
                  style={{
                    border: '1px solid #ccc',
                    padding: '0.5rem',
                    width: '2rem',
                    textAlign: 'center',
                  }}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spiral;
