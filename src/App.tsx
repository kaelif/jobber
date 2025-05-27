import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function nextVersion(version: string): string {
  const parts = version.split('.').map(Number);
  let i = parts.length - 1;
  parts[i]++;
  while (i > 0 && parts[i] > 9) {
    parts[i] = 0;
    parts[--i]++;
  }
  return parts.join('.');
}

function createSpiral(N: number): number[][] {
  if (N < 1) return [];
  const spiral = Array.from({ length: N }, () => Array(N).fill(0));
  let value = 1;
  let top = 0, bottom = N - 1, left = 0, right = N - 1;

  while (value <= N * N) {
    for (let i = left; i <= right; i++) spiral[top][i] = value++;
    top++;
    for (let i = top; i <= bottom; i++) spiral[i][right] = value++;
    right--;
    for (let i = right; i >= left; i--) spiral[bottom][i] = value++;
    bottom--;
    for (let i = bottom; i >= top; i--) spiral[i][left] = value++;
    left++;
  }

  return spiral;
}

function flattenSpiral(matrix: number[][]): number[] {
  return matrix.flat();
}

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{ version?: string; spiral?: number[][]; flatSpiral?: number[] }>({});

  const handleSubmit = () => {
    const trimmed = input.trim();

    if (trimmed.includes(',')) {
      toast.error('Comma-separated values are not allowed.');
      return;
    }

    if (!trimmed.includes('.')) {
      const num = Number(trimmed);
      if (Number.isInteger(num) && num > 0 && trimmed === String(num)) {
        const spiral = createSpiral(num);
        const version = nextVersion(trimmed);
        setOutput({ version, spiral, flatSpiral: flattenSpiral(spiral) });
        return;
      }
    }

    if (trimmed.includes('.') && !trimmed.includes(',')) {
      const parts = trimmed.split('.');
      const nums = parts.map(p => Number(p));
      const allValid = parts.every((p, i) => {
        const n = nums[i];
        return Number.isInteger(n) && p === String(n);
      });

      if (allValid) {
        const invalid = parts.slice(1).some(p => p.length > 1);
        if (invalid) {
          toast.error('Version parts after the first must be single-digit (e.g., 1.2.3 is okay, 1.22.3 is not).');
          return;
        }
        setOutput({ version: nextVersion(trimmed) });
        return;
      }
    }

    toast.error('Invalid input. Use a version like "1.2.3" or a single number like "3".');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Semantic Version & Spiral Generator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter "1.2.3" or "3"'
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {output.version && (
        <>
          <h2 className="font-semibold mt-6">Next Version:</h2>
          <div className="bg-white p-2 rounded border">{output.version}</div>
        </>
      )}

      {output.spiral && (
        <>
          <h2 className="font-semibold mt-6">Spiral Output (Grid):</h2>
          <pre
            className="bg-gray-100 p-3 rounded border overflow-auto text-sm"
            style={{ fontFamily: 'Courier, monospace' }}
          >
            {renderSpiral(output.spiral)}
          </pre>
        </>
      )}
    </div>
  );
}

function renderSpiral(matrix: number[][]): string {
  if (matrix.length === 0) return '';
  const maxNum = matrix.length * matrix.length;
  const width = String(maxNum).length;
  return matrix
    .map((row) => row.map((num) => String(num).padStart(width, ' ')).join(' '))
    .join('\n');
}

export default App;
export { nextVersion, createSpiral };
