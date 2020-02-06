import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isString');

/**
 * Solution Definition
 */

solution
  .description('checks the input is string')
  .example('r.isString("") // true')
  .example('r.isString({}) // false')
  .example('r.isString(NaN) // false')
  .example('r.isString(2) // false')
  .example('r.isString([]) // false')
  .example('r.isString(undefined) // false')
  .test('Return true when is string', [''], true)
  .test('Return false when is object', [{}], false)
  .test('Return false when is NaN', [NaN], false)
  .test('Return false when is number', [2], false)
  .test('Return false when is array', [[]], false)
  .test('Return false when is undefined', [undefined], false)
  .test('Return false when is date', [new Date()], false)
  .bench([{}]);
/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('cagataycali')
  .method('Check input is string')
  .fn(
    (input: any) => Object.prototype.toString.call(input) === '[object String]'
  );
