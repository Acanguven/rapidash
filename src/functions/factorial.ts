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
  .test('Return 1 for input 0', [0], 1)
  .bench([14])
  .bench([3])
  .bench([60]);

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
  .owner('BatuAksoy')
  .method('Tail Recursive')
  .fn(function factorial(n, accumulator = 1): number {
    return n <= 1 ? accumulator : factorial(n - 1, n * accumulator);
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

solution
  .owner('eylmz')
  .method('Reverse For Loop')
  .fn(function factorial(n): number {
    let b = 1;
    for (let i = n; i >= 2; i--) {
      b *= i;
    }

    return b;
  });

solution
  .owner('ilker0')
  .method('While Loop')
  .fn(function factorial(n): number {
    let b = 1;
    while (n > 0) {
      b *= n;
      n -= 1;
    }

    return b;
  });
