import { SolutionBuilder } from '../solution';

export type definition = <T>(array: T[], depth?: number) => T[];

export const solution = new SolutionBuilder<definition>('fibonacci');

solution
  .description('Flattens given array according to given depth.')
  .example('r.flatten([2, 3, [4, [6]]], 1) // [2, 3, 4, [6]]')
  .example('r.flatten([2, 3, [4, [6]]], 2) // [2, 3, 4, 6]')
  .test('Return same', [[1, 2], 1], [1, 2])
  .test('Return flattened array for depth 1', [[1, [3]], 1], [1, 3])
  .bench([[1, 2, [2, 3, 4, [3, 4, [5]]]], 1]);

const isFlattenable = (value: any) => {
  return Array.isArray(value) || !!(value && value[Symbol.isConcatSpreadable])
}
const base = (array: any, depth: number, result: any[] = []): any => {
  if (array === null || array === undefined) {
    return result;
  }

  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (depth > 0 && isFlattenable(value)) {
      if (depth > 1) {
        base(value, depth - 1, result);
      } else {
        result.push(...(value as []));
      }
    } else {
      result[result.length] = value;
    }
  }

  return result;
}
const flatten = <T>(array: T[], depth = 1): T[] => {
  return base(array, depth, []);
}
solution
  .owner('mehmetsefabalik')
  .method('Flatten')
  .fn(flatten);


