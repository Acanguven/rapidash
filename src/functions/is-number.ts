import { SolutionBuilder } from '../solution';

export type definition = (input: any) => boolean;

export const solution = new SolutionBuilder<definition>('isNumber');

/**
 * Solution Definition
 */

solution
  .description('checks the input is number')
  .example('r.isNumber(2) // true')
  .example('r.isNumber("") // false')
  .example('r.isNumber({}) // false')
  .example('r.isNumber(NaN) // false')
  .example('r.isNumber([]) // false')
  .example('r.isNumber(undefined) // false')
  .test('Return true when is number', [2], true)
  .test('Return false when is string', [''], false)
  .test('Return false when is object', [{}], false)
  .test('Return false when is NaN', [NaN], false)
  .test('Return false when is array', [[]], false)
  .test('Return false when is undefined', [undefined], false)
  .test('Return false when is date', [new Date()], false)
  .bench([2])
  .bench([''])
  .bench([{}])
  .bench([NaN])
  .bench([undefined])
  .bench([[]]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('cagataycali')
  .method('Check input is number')
  .fn(
    (input: any) =>
      !isNaN(input) &&
      Object.prototype.toString.call(input) === '[object Number]'
  );

solution
  .owner('yavuzkoca')
  .method('JS Typeof')
  .fn((input: any) => !isNaN(input) && typeof input === 'number');

solution
  .owner('ibrahimozdogan')
  .method('Validate value by using short-circuit evaluation and typeof')
  .fn((value: any) => typeof (value || '') === 'number');
