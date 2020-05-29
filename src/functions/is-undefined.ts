import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isUndefined');

/**
 * Solution Definition
 * Return true if input is undefined
 */

solution
  .description('checks the input is undefined')
  .example('r.isUndefined(null) // false')
  .example('r.isUndefined(undefined) // true')
  .example('r.isUndefined(0) // false')
  .example('r.isUndefined(false) // false')
  .example('r.isUndefined(true) // false')
  .example('r.isUndefined("") // false')
  .test('Return false when is null', [null], false)
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
  .owner('ibrahimozdogan')
  .method('Typeof control')
  .fn((input: any) => typeof input === 'undefined');
