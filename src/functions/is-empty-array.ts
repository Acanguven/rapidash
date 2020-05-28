import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isEmptyArray');

/**
 * Solution Definition
 * Return true if input is an empty array. if the input is not an array, returns `false`
 */

solution
  .description('checks the input is empty array')
  .example('r.isEmptyArray(null) // false')
  .example('r.isEmptyArray(undefined) // false')
  .example('r.isEmptyArray({}) // false')
  .example('r.isEmptyArray([]) // true')
  .example('r.isEmptyArray([""]) // false')
  .example('r.isEmptyArray("test") // false')
  .example('r.isEmptyArray("") // false')
  .example('r.isEmptyArray(1) // false')
  .example('r.isEmptyArray([new Date()]) // false')
  .test('Return false when is null', [null], false)
  .test('Return false when is undefined', [undefined], false)
  .test('Return false when is number', [0], false)
  .test('Return false when is bool', [false], false)
  .test('Return false when is bool', [true], false)
  .test('Return false when is string', [''], false)
  .test('Return true when is empty array', [[]], true)
  .test('Return false when is not empty array', [['']], false)
  .bench([null])
  .bench([undefined])
  .bench([false])
  .bench([true])
  .bench([''])
  .bench([])
  .bench([[], []])
  .bench([['']])
  .bench([{}])
  .bench([0]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('ibrahimozdogan')
  .method('Checks the given is empty array or not')
  .fn((value: any) => Array.isArray(value) && value.length === 0);
