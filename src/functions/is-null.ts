import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isNull');

/**
 * Solution Definition
 * Return true if input is null or undefined
 */

solution
  .description('checks the input is null or undefined')
  .example('r.isNull(null) // true')
  .example('r.isNull(undefined) // true')
  .example('r.isNull(0) // false')
  .example('r.isNull(false) // false')
  .example('r.isNull(true) // false')
  .example('r.isNull("") // false')
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
