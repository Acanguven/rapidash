# Submitting a Solution

Rapidash is open-source friendly, feel free to submit any solution that passes the tests. All you need to create a pull request.

## Step by Step Guide

> /src/functions/factorial.ts

```js
import {SolutionBuilder} from '../solution';

export type definition = (num: number) => number;

export const solution = new SolutionBuilder<definition>('factorial');

/**
 * Solution Definition
 */

solution
  .description('Calculates the factorial of a number.')
  .example('r.factorial(6) // 720')
  .test('Return factorial', [6], 720)
  .bench([14]);

/**
 * Solutions
 * Provide your totalSolutions below
 */

solution
  .owner('acanguven')
  .method('Recursive')
  .fn(function factorial(n): number {
    return n <= 1 ? 1 : factorial(n - 1) * n
  });
```

We have a `factorial` method that calculates the factorial of a number. Currently, there is only one solution submitted.
Now we will be adding another solution. Check out the template below.

```js
solution
  .owner('your github username')
  .method('which method you used to solve the problem')
  .fn(function factorial(n) {
    //the solution implementation
    return n <= 1 ? 1 : factorial(n - 1) * n
  });
```

<p class="tip">
Project is built on typescript so static type checking is enabled to provide better functional programming experience.
</p>


After adding our new solution, the latest version of the file will be like below.

```js
import {SolutionBuilder} from '../solution';

export type definition = (num: number) => number;

export const solution = new SolutionBuilder<definition>('factorial');

/**
 * Solution Definition
 */

solution
  .description('Calculates the factorial of a number.')
  .example('r.factorial(6) // 720')
  .test('Return factorial', [6], 720)
  .bench([14]);

/**
 * Solutions
 * Provide your totalSolutions below
 */

solution
  .owner('acanguven')
  .method('Recursive')
  .fn(function factorial(n): number {
    return n <= 1 ? 1 : factorial(n - 1) * n
  });

solution
  .owner('mygithubusername')
  .method('byloopinglikeaboss')
  .fn(function factorial(n) {
    //the solution implementation
    return n <= 1 ? 1 : factorial(n - 1) * n
  });
```

Then open a pull request, tests will automatically run and if they pass we will merge your solution and you will get your score.

Tests are located above the file: `.test('Test name', [param1, param2], expectedOutput)`. There can be multiple tests. You can run `npm run test` to run tests locally.

## Running Benchmarks & Tests

You can run tests and benchmarks on your computer too. It is useful for develop - benchmark cycle.

* Example Usage
```bash
npm run solution max acanguven
```

Rapidash runs tests for acanguven's max solution then starts benchmarking it comparing to other solutions. The owner's name is optional for tests targeting other solutions.
