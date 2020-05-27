import { SolutionBuilder } from '../solution';

export type definition = (times: number, data: any) => any | undefined;

export const solution = new SolutionBuilder<definition>('times');

/**
 * Solution Definition
 */

solution
  .description(
    'times receives as arguments the number of iterations and a function to execute n times and returns an array of the results. Very useful when creating dynamic test data.'
  )
  .example('r.times(2, null) // [null, null]')
  .example('r.times() // []')
  .example('r.times(2) // [undefined, undefined]')
  .example('r.times(2, 2) // [2, 2]')
  .test('Return filled null twice', [2, null], [null, null])
  .test('Return filled undefined twice', [2], [undefined, undefined])
  .test(
    'Return filled object twice',
    [2, { test: 'object' }],
    [{ test: 'object' }, { test: 'object' }]
  )
  .test('Return filled 2 twice', [2, 2], [2, 2])
  .bench([2, 2])
  .bench([100, { hello: 'world' }])
  .bench([
    1000,
    { hello: 'world', nested: { object: { with: { array: [] } } } },
  ]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('cagataycali')
  .method('Using new Arrray().fill.')
  .fn((times, data) => {
    return new Array(times).fill(data);
  });

solution
  .owner('ibrahimozdogan')
  .method('Filling array according to the `times` with the `value` by using `for` loop')
  .fn((times, value) => {
    const data = [];

    for (let i = 0; i < times; i++) {
      data.push(value);
    }

    return data;
  });
