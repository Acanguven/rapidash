class Solution<T = any> {
  methodDescription!: string;
  func!: T;
  owner: string;

  constructor(name: string) {
    this.owner = name;
  }

  method(way: string) {
    this.methodDescription = way;
    return this;
  }

  fn(handler: T) {
    this.func = handler;
    return this;
  }
}

class SolutionBuilder<T = any> {
  testCases: Array<{
    input: unknown[];
    output: unknown;
    name: string;
  }> = [];

  solutions: Array<Solution<T>> = [];

  name: string;

  benchmarkInput!: unknown[];

  examples: string[] = [];

  descr = '';

  constructor(name: string) {
    this.name = name;
  }

  test(name: string, input: unknown[], output: unknown) {
    this.testCases.push({name, input, output});
    return this;
  }

  owner(name: string) {
    const method = new Solution<T>(name);
    this.solutions.push(method);
    return method;
  }

  bench(input: unknown[]) {
    this.benchmarkInput = input;
    return this;
  }

  example(example: string) {
    this.examples.push(example);
    return this;
  }

  description(description: string) {
    this.descr = description;
    return this;
  }
}

export {Solution, SolutionBuilder};
