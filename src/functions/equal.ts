import { SolutionBuilder } from '../solution';

export type definition = (a: any, b: any) => boolean;

export const solution = new SolutionBuilder<definition>('equal');

// Original repository: https://github.com/epoberezkin/fast-deep-equal
// Modified & bugs fixed by @cagataycali

/**
 * Solution Definition
 */

solution
  .description('compare two object is equal.')
  .example('r.equal([], []) // true')
  .example('r.equal({}, {}) // true')
  .example('r.equal(NaN, NaN) // true')
  .test('Check two string is equal', ['hello', 'world'], false)
  .test('Check two empty array is equal', [[], []], true)
  .test(
    'Check two function is equal',
    [{ toString: () => 'Hello world!' }, { toString: () => 'Hello world!' }],
    true
  )
  .test(
    'Check two function is not equal',
    [{ toString: () => 'Hello world!' }, { toString: () => 'Hello rapidash!' }],
    false
  )
  .test(
    'Check two array of objects is equal',
    [
      [{ a: 'a' }, { b: 'b' }],
      [{ a: 'a' }, { b: 'b' }],
    ],
    true
  )
  .test(
    'Check two array of objects is not equal',
    [
      [{ a: 'a' }, { b: 'b' }],
      [{ a: 'a' }, { b: 'd' }],
    ],
    false
  )
  .test(
    'Check date is equal',
    [new Date(1996, 4, 11), new Date(1996, 4, 11)],
    true
  )
  .test(
    'Check date is not equal',
    [new Date(1996, 4, 11), new Date(2020, 1, 1)],
    false
  )
  .test('Check two empty object is equal', [{}, {}], true)
  .test('Check two object is equal', [{ bar: {} }, {}], false)
  .test('Check object and string', ['', {}], false)
  .test('Check object and array', [[], {}], false)
  .test('Check two empty set is equal', [new Set(), new Set()], true)
  .test(
    'Check two set is not equal',
    [new Set([3, 2, 1]), new Set([1, 2, 3])],
    false
  )
  .test('Check two empty map is equal', [new Map(), new Map()], true)
  .test(
    'Check set and map is not equal',
    [new Map(), new Set([3, 2, 1])],
    false
  )
  .test(
    'Check two filled set is not equal',
    [new Set([1, 2, 3]), new Set([1, 2, 4])],
    false
  )
  .test(
    'Check not equal arrays (different item)',
    [new Int32Array([1, 2, 3]), new Int32Array([1, 2, 4])],
    false
  )
  .test(
    'Check pseudo array and equivalent typed array are not equal',
    [
      { '0': 1, '1': 2, length: 2, constructor: Int32Array },
      new Int32Array([1, 2]),
    ],
    false
  )
  .test(
    'Check different classes but same data',
    [new Int32Array([1, 2, 3]), new Int16Array([1, 2, 3])],
    false
  )
  .test(
    'Check two empty object is equal',
    [{ hello: 'world' }, { hello: 'world' }],
    true
  )
  .test('Check two NaN is equal', [NaN, NaN], true)
  .test('Check different constructors', [{}, []], false)
  .test(
    'Check different RegExps with different sources',
    [/ab+c/i, /ab+cd/i],
    false
  )
  .test(
    'Check different RegExps with different flags',
    [/ab+c/i, /ab+c/g],
    false
  )
  .test(
    'Check different array size',
    [
      [1, 2, 3],
      [1, 2],
    ],
    false
  )
  .test(
    'Check different array values',
    [
      [1, 2, 3],
      [1, 2, 4],
    ],
    false
  )
  .test(
    'Check two identical objects',
    [
      { foo: 'bar', bar: 'foo' },
      { bar: 'foo', foo: 'bar' },
    ],
    true
  )
  .bench([
    [
      { foo: 'bar', bar: 'foo' },
      { bar: 'foo', foo: 'bar' },
    ],
  ]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('cagataycali')
  .method('Recursively check object equality')
  .fn(function equal(a: any, b: any): boolean {
    if (a === b) return true;

    if (a && b && typeof a === 'object' && typeof b === 'object') {
      if (a.constructor !== b.constructor) return false;

      let length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0;) {
          if (!equal(a[i], b[i])) return false;
        }
        return true;
      }

      if (a.constructor === RegExp) {
        return a.source === b.source && a.flags === b.flags;
      }
      if (a.valueOf !== Object.prototype.valueOf) {
        return a.valueOf() === b.valueOf();
      }
      if (
        a.__proto__ === b.__proto__ &&
        [Set.prototype, Map.prototype].includes(a.__proto__)
      ) {
        return equal(Array.from(a), Array.from(b));
      }
      if (a.toString !== Object.prototype.toString) {
        return a.toString() === b.toString();
      }

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      }

      for (i = length; i-- !== 0;) {
        const key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }

      return true;
    }

    // true if both NaN, false otherwise
    return a !== a && b !== b;
  });
