import { SolutionBuilder } from '../solution';

export type definition = (...arr: number[]) => number;

export const solution = new SolutionBuilder<definition>('average');

/**
 * Solution Definition
 */

solution
  .description('Returns the average of two or more numbers.')
  .example('r.average() // NaN')
  .example('r.average(1) // 1')
  .example('r.average(1,2) // 1.5')
  .example('r.average(1,2,3) // 2')
  .test('Return nan when no parameter', [], NaN)
  .test('Return same when single parameter', [55], 55)
  .test('Return average', [1, 2, 3], 2)
  .test('Return average with zero', [1, 2, 3, 0], 1.5)
  .bench([1, 2, 3, 0, 73, 53, 23, 54, 23, 74, 3, 42]);

/**
 * Solutions
 * Provide your totalSolutions below
 */

solution
  .owner('acanguven')
  .method(
    'Use Array.prototype.reduce() to add each value to an accumulator, initialized with a value of 0, divide by the length of the array.'
  )
  .fn((...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length);
