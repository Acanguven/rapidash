import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isNil');

/**
 * Solution Definition
 * Return true if input is null or undefined
 */

solution
  .description('checks the input is number')
  .example('r.isNil(null) // true')
  .example('r.isNil(undefined) // true')
  .example('r.isNil(0) // false')
  .example('r.isNil(false) // false')
  .example('r.isNil(true) // false')
  .example('r.isNil("") // false')
  .test('Return true when is null', [null], true)
  .test('Return true when is undefined', [undefined], true)
  .test('Return false when is number', [0], false)
  .test('Return false when is bool', [false], false)
  .test('Return false when is bool', [true], false)
  .test('Return false when is string', [''], false)
  .bench([null])
  .bench([undefined])
  .bench([false])
  .bench([true])
  .bench([''])
  .bench([0]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('yavuzkoca')
  .method('Type coercion comparision')
  .fn((input: any) => input == null);