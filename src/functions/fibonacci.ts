import { SolutionBuilder } from '../solution';

export type definition = (num: number) => number;

export const solution = new SolutionBuilder<definition>('fibonacci');

/**
 * Solution Definition
 */

solution
  .description('Calculates the fibonacci number with given index.')
  .example('r.fibonacci(1) // 1')
  .example('r.fibonacci(3) // 3')
  .example('r.fibonacci(20) // 6765')
  .test('Return fibonacci for 1', [1], 1)
  .test('Return fibonacci for 3', [3], 2)
  .test('Return fibonacci for 20', [20], 6765)
  .bench([14]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('yavuzkoca')
  .method('Dynamic')
  .fn(function fibonacci(n): number {
    let b = 1;
    for (let i = 2, a = 0, c; i <= n; ++i) {
      c = a + b;
      a = b;
      b = c;
    }

    return b;
  });
