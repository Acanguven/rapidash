import { SolutionBuilder } from '../solution';

export type definition = (arr: number[]) => number | undefined;

export const solution = new SolutionBuilder<definition>('max');

/**
 * Solution Definition
 */

solution
  .description(
    'Computes the maximum value of array. If array is empty or falsey, undefined is returned.'
  )
  .example('r.max([1,2,3]) // 3')
  .example('r.max() // undefined')
  .example('r.max([]) // undefined')
  .test('Return max number', [[1, 2, 3]], 3)
  .test('Return max number', [[3, 1, 6, 3, 7]], 7)
  .test('Return undefined for empty', [[]], undefined)
  .test('Return undefined for no params', [], undefined)
  .bench([
    [
      1,
      2,
      3,
      4,
      5,
      6,
      1,
      3,
      5,
      7,
      2,
      8,
      9,
      32,
      4,
      8,
      4,
      4,
      5,
      7,
      56,
      1,
      5,
      8,
      4,
      4,
      6,
    ],
  ]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('acanguven')
  .method('Reduce')
  .fn(arr => {
    if (!arr || !arr.length) return;

    return arr.reduce((a, b) => {
      return Math.max(a, b);
    });
  });

solution
  .owner('cagataycali')
  .method('Reduce')
  .fn(arr => {
    if (!arr || !arr.length) return;

    return arr.reduce((max, val) => (val > max ? val : max), arr[0]);
  });

solution
  .owner('yavuzkoca')
  .method('Linear')
  .fn(arr => {
    if (!arr) return;
    const len = arr.length;
    if (!len) return;
    let max = arr[0];

    for (let i = 1; i < len; ++i) {
      if (arr[i] > max) max = arr[i];
    }

    return max;
  });

solution
  .owner('ilker0')
  .method('Linear')
  .fn(arr => {
    if (!arr || !arr.length) return;

    let max = arr[0];

    for (let i = 0, len = arr.length; i < len; ++i) {
      if (arr[i] > max) max = arr[i];
    }

    return max;
  });
