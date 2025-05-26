import { nextVersion, createSpiral } from './App';

describe('nextVersion', () => {
  test('increments last digit', () => {
    expect(nextVersion('1.2.3')).toBe('1.2.4');
  });

  test('carries over when last digit > 9', () => {
    expect(nextVersion('1.2.9')).toBe('1.3.0');
  });

  test('carries over multiple places', () => {
    expect(nextVersion('1.9.9')).toBe('2.0.0');
  });

  test('single number increments correctly', () => {
    expect(nextVersion('9')).toBe('10');
  });

  test('multiple segments increments correctly', () => {
    expect(nextVersion('0.0.0')).toBe('0.0.1');
  });
});

describe('createSpiral', () => {
  test('returns empty array for N < 1', () => {
    expect(createSpiral(0)).toEqual([]);
    expect(createSpiral(-5)).toEqual([]);
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
});
