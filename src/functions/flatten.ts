import { SolutionBuilder } from '../solution';

export type definition = <T>(array: T[], depth?: number) => T[];

export const solution = new SolutionBuilder<definition>('flatten');

solution
  .description('Flattens given array according to given depth.')
  .example('r.flatten([2, 3, [4, [6]]], 1) // [2, 3, 4, [6]]')
  .example('r.flatten([2, 3, [4, [6]]], 2) // [2, 3, 4, 6]')
  .test('Return empty array', [null], [])
  .test('Return same array', [[1, 2], 1], [1, 2])
  .test('Return flattened array for depth 1', [[1, [3]], 1], [1, 3])
  .test(
    'Return flattened array for depth 2',
    [[1, [3, [4, 5]]], 2],
    [1, 3, 4, 5]
  )
  .bench([[1, 2, [2, 3, 4, [3, 4, [5]]]], 1]);
solution
  .owner('mehmetsefabalik')
  .method('Flatten')
  // tsc complaint about 'implicitly any type' for depth param when I removed the number type,
  // so I should disable this rule for next line
  // tslint:disable-next-line: no-inferrable-types
  .fn(<T>(array: T[], depth: number = 1): T[] => {
    const isFlattenable = (value: any) => {
      return (
        Array.isArray(value) || !!(value && value[Symbol.isConcatSpreadable])
      );
    };
    const base = (array: any, depth: number, result: any[]): any => {
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
    };
    return base(array, depth, []);
  });
