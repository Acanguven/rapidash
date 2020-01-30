/**
 *  Computes the maximum value of array. If array is empty or falsey, undefined is returned.
 *
 *  max([1,2,3]) => 3
 *  max() => undefined
 *  max(false) => undefined
 *  max([]) => undefined
 *
 */
import { SolutionBuilder } from '../solution';

export type definition = (arr: number[]) => number | undefined;

export const solution = new SolutionBuilder<definition>('max');

/**
 * Solution Tests
 * Feel free add any test cases
 */

solution
  .test('Return max number', [['cagatay', 'oguzhan', 'osman']], 'http://test.com/path?cagatay=true&oguzhan=true&osman=true')
  .bench([['cagatay', 'oguzhan', 'osman']]);

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
  .owner('acanguven2')
  .method('Reduce')
  .fn(arr => {
    if (!arr || !arr.length) return;

    return arr.reduce((max, val) => (val > max ? val : max), arr[0]);
  });
