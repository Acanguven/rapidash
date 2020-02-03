import { SolutionBuilder } from '../solution';

export type definition = (num: number) => number[];

export const solution = new SolutionBuilder<definition>('primes');

/**
 * Solution Definition
 */

solution
  .description('Generates primes up to a given number.')
  .example('r.primes(10) // [2,3,5,7]')
  .test('Return empty array till valid primes', [1], [])
  .test(
    'Return empty array till valid primes when no argument supplied',
    [],
    []
  )
  .test('Return average with zero', [10], [2, 3, 5, 7])
  .bench([150]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('acanguven')
  .method(
    'Generate an array from 2 to the given number. Use Array.prototype.filter() to filter out the values divisible by any number from 2 to the square root of the provided number.'
  )
  .fn(num => {
    let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2);
    const sqroot = Math.floor(Math.sqrt(num));
    const numsTillSqroot = Array.from({ length: sqroot - 1 }).map(
      (x, i) => i + 2
    );
    numsTillSqroot.forEach(
      x => (arr = arr.filter(y => y % x !== 0 || y === x))
    );
    return arr;
  });
