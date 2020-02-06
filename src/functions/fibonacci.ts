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
  .test('Return fibonacci for 70', [70], 190392490709135)
  .test('Return fibonacci for 90', [90], 2880067194370816000)
  .bench([14])
  .bench([100]);
// .bench([200])
// .bench([1000]);

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

solution
  .owner('Emre-Kul')
  .method('Golden Ratio')
  .fn(function fibonacci(n): number {
    if (n <= 1) return 1;
    if (n > 70) {
      let b = 1;
      for (let i = 2, a = 0, c; i <= n; ++i) {
        c = a + b;
        a = b;
        b = c;
      }
      return b;
    }
    const sq5 = Math.sqrt(5);
    const phi1 = (1 + sq5) / 2;
    const phi2 = (1 - sq5) / 2;
    return Math.round(Math.pow(phi1, n) / sq5 + Math.pow(phi2, n) / sq5);
  });
