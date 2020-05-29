import { SolutionBuilder } from '../solution';

export type definition = (num: number) => boolean;

export const solution = new SolutionBuilder<definition>('isPrime');

/**
 * Solution Definition
 */

solution
  .description('Returns true if given number is prime. Otherwise, false')
  .example('r.isPrime(2) // true')
  .example('r.isPrime(1) // false')
  .test('Return false when input is 1', [1], false)
  .test('Return true when input is 2', [2], true)
  .test('Return false when input is 9', [9], false)
  .test('Return true when input is 11', [11], true)
  .test('Return true when input is 9973', [9973], true)
  .test('Return true when input is 3', [3], true)
  .test('Return false when input is 10', [25], false)
  .bench([9973])
  .bench([10007])
  .bench([9851])
  .bench([7529]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('yavuzkoca')
  .method('Loop through the square root of the given number')
  .fn((num: number): boolean => {
    if (num === 1) return false;
    if (num === 2) return true;
    if (num === 3) return true;
    if (num % 3 === 0) return false;
    for (let i = 5, width = 2; i * i <= num; i += width, width = 6 - width) {
      if (num % i === 0) return false;
    }

    return true;
  });
