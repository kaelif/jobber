import { createSpiral } from './spiral';

test('returns empty for N < 1', () => {
  expect(createSpiral(0)).toEqual([]);
  expect(createSpiral(-1)).toEqual([]);
});

test('generates 1x1 spiral', () => {
  expect(createSpiral(1)).toEqual([[1]]);
});

test('generates 2x2 spiral', () => {
  expect(createSpiral(2)).toEqual([
    [1, 2],
    [4, 3],
  ]);
});

test('generates 3x3 spiral', () => {
  expect(createSpiral(3)).toEqual([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ]);
});

test('generates 4x4 spiral', () => {
  expect(createSpiral(4)).toEqual([
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ]);
});

test('generates 5x5 spiral', () => {
  expect(createSpiral(5)).toEqual([
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9],
  ]);
});

test('spiral contains all numbers from 1 to N*N with no duplicates', () => {
  const N = 6;
  const spiral = createSpiral(N);
  const flat = spiral.flat();
  const expected = Array.from({ length: N * N }, (_, i) => i + 1);
  expect(flat.sort((a, b) => a - b)).toEqual(expected);
});

test('non-integer N is treated like Math.floor(N)', () => {
  // Assuming createSpiral only accepts integers — this guards against accidental bugs
  expect(createSpiral(3.9)).toEqual(createSpiral(3));
});
