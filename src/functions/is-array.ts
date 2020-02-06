import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isArray');

/**
 * Solution Definition
 */

solution
  .description('checks the input is array')
  .example('r.isArray({}) // true')
  .example('r.isArray(2) // false')
  .example('r.isArray("") // false')
  .example('r.isArray(NaN) // false')
  .example('r.isArray([]) // false')
  .example('r.isArray(undefined) // false')
  .test('Return true when is array', [[]], true)
  .test('Return false when is number', [2], false)
  .test('Return false when is string', [''], false)
  .test('Return false when is NaN', [NaN], false)
  .test('Return false when is object', [{}], false)
  .test('Return false when is undefined', [undefined], false)
  .test('Return false when is date', [new Date()], false)
  .bench([{}]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('cagataycali')
  .method('Check input is array')
  .fn(
    (input: any) => Object.prototype.toString.call(input) === '[object Array]'
  );
