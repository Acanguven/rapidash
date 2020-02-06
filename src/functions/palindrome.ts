import { SolutionBuilder } from '../solution';

export type definition = (word: string) => boolean;

export const solution = new SolutionBuilder<definition>('palindrome');

/**
 * Solution Definition
 */

solution
  .description('Returns true if given word is palindrome. Otherwise, false')
  .example('r.palindrome("") // true')
  .example('r.palindrome("a") // true')
  .example('r.palindrome("aa") // true')
  .example('r.palindrome("aab") // false')
  .example('r.palindrome("aaaaa") // true')
  .example('r.palindrome("aaaaabaaa") // false')
  .test('Return true when input is empty string', [''], true)
  .test('Return true when input is one character', ['a'], true)
  .test('Return true when input is two character', ['aa'], true)
  .test('Return false when input is "aab"', ['aab'], false)
  .test('Return true when input is "aaaaa"', ['aaaaa'], true)
  .test('Return false when input is "aaaaabaaa"', ['aaaaabaaa'], false)
  .test(
    'Return false when input is not palindrome',
    [`${'b'.repeat(1000)}${'a'.repeat(1000)}`],
    false
  )
  .test(
    'Return false when input is not palindrome',
    [`${'a'.repeat(1000)}ab${'a'.repeat(1000)}`],
    false
  )
  .test('Return true when input is palindrome', [`${'a'.repeat(1000)}`], true)
  .bench([`${'a'.repeat(10)}b${'a'.repeat(9)}`])
  .bench(['a'.repeat(1000)])
  .bench([`${'a'.repeat(1000)}ab${'a'.repeat(1000)}`])
  .bench([`${'b'.repeat(1000)}${'a'.repeat(1000)}`]);

/**
 * Solutions
 * Provide your solutions below
 */

solution
  .owner('yavuzkoca')
  .method('Loop to the half of the string and compare character by character')
  .fn((word: string): boolean => {
    const len = word.length;
    for (let i = 0; i < len / 2; i++) {
      if (word[i] !== word[len - i - 1]) return false;
    }

    return true;
  });
