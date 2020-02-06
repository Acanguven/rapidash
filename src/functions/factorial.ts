import { SolutionBuilder } from '../solution';

export type definition = (num: number) => number;

export const solution = new SolutionBuilder<definition>('factorial');

/**
 * Solution Definition
 */

solution
  .description('Calculates the factorial of a number.')
  .example('r.factorial(6) // 720')
  .test('Return factorial', [6], 720)
  .bench([14]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('acanguven')
  .method('Recursive')
  .fn(function factorial(n): number {
    return n <= 1 ? 1 : factorial(n - 1) * n;
  });

solution
  .owner('yavuzkoca')
  .method('For Loop')
  .fn(function factorial(n): number {
    let b = 1;
    for (let i = 2; i <= n; i++) {
      b *= i;
    }

    return b;
  });
