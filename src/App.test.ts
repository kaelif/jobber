import { nextVersion, createSpiral } from './App';

describe('nextVersion', () => {
  test('increments last digit', () => {
    expect(nextVersion('1.2.3')).toBe('1.2.4');
  });

  test('carries over when last digit is 9', () => {
    expect(nextVersion('1.2.9')).toBe('1.3.0');
  });

  test('carries over multiple places', () => {
    expect(nextVersion('1.9.9')).toBe('2.0.0');
    expect(nextVersion('0.9.9')).toBe('1.0.0');
  });

  test('single number increments correctly', () => {
    expect(nextVersion('9')).toBe('10');
    expect(nextVersion('1')).toBe('2');
  });

  test('multiple segments increments correctly', () => {
    expect(nextVersion('0.0.0')).toBe('0.0.1');
  });

  test('long version chain increments correctly', () => {
    expect(nextVersion('1.2.3.4.5.6.7.8')).toBe('1.2.3.4.5.6.7.9');
  });

  test('long version with carryover at the end', () => {
    expect(nextVersion('1.2.3.4.5.6.7.9')).toBe('1.2.3.4.5.6.8.0');
  });

  test('carryover at all positions except first', () => {
    expect(nextVersion('9.9')).toBe('10.0');
    expect(nextVersion('99.9.9')).toBe('100.0.0');
  });

  test('handles versions with leading zeros as numbers', () => {
    expect(nextVersion('01.2.3')).toBe('1.2.4'); 
  });
});

describe('createSpiral', () => {
  test('returns empty array for N < 1', () => {
    expect(createSpiral(0)).toEqual([]);
    expect(createSpiral(-5)).toEqual([]);
    expect(createSpiral(-1)).toEqual([]);
  });

  test('creates 1x1 spiral', () => {
    expect(createSpiral(1)).toEqual([[1]]);
  });

  test('creates 2x2 spiral', () => {
    expect(createSpiral(2)).toEqual([
      [1, 2],
      [4, 3],
    ]);
  });

  test('creates 3x3 spiral', () => {
    expect(createSpiral(3)).toEqual([
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]);
  });

  test('creates 4x4 spiral', () => {
    expect(createSpiral(4)).toEqual([
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7],
    ]);
  });

  test('creates 5x5 spiral', () => {
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

  test('spiral matrix has correct dimensions for N=7', () => {
    const spiral = createSpiral(7);
    expect(spiral.length).toBe(7);
    spiral.forEach(row => {
      expect(row.length).toBe(7);
    });
  });
});
