import { createSpiral } from './spiral';

test('returns empty for N < 1', () => {
  expect(createSpiral(0)).toEqual([]);
});

test('generates 1x1 spiral', () => {
  expect(createSpiral(1)).toEqual([[1]]);
});

test('generates 2x2 spiral', () => {
  expect(createSpiral(2)).toEqual([[1, 2], [4, 3]]);
});

test('generates 3x3 spiral', () => {
  expect(createSpiral(3)).toEqual([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ]);
});
