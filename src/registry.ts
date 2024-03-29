import { SolutionBuilder } from './solution';
import { Benchmark, BenchmarkReport } from './benchmark';
import * as solutions from './functions';

type BenchmarkResults = Array<{
  function: SolutionBuilder;
  benchmarkResults: BenchmarkReport;
}>;

const solutionArg =
  process.argv[2] === '--coverage' ? undefined : process.argv[2];
const ownerArg = process.argv[3];

class Registry {
  static solutions: SolutionBuilder[] = [];

  static solution(fnName: string, solutions: SolutionBuilder) {
    this.solutions.push(solutions);
    return this;
  }

  static async benchmarkWinners() {
    const benchMarksResults: BenchmarkResults = [];

    for (const solution of this.solutions) {
      if (!solutionArg || solution.name === solutionArg) {
        const benchmark = new Benchmark(
          solution.solutions,
          solution.benchmarkInput,
          solution.name
        );

        benchMarksResults.push({
          function: solution,
          benchmarkResults: await benchmark.run(),
        });
      }
    }

    return benchMarksResults;
  }

  static runSolutionTests() {
    this.solutions.forEach(solutionBuilder => {
      if (!solutionArg || solutionArg === solutionBuilder.name) {
        describe(solutionBuilder.name, () => {
          solutionBuilder.solutions.forEach(solution => {
            if (!ownerArg || ownerArg === solution.owner) {
              describe(`Solution Owner: ${solution.owner}, method: ${solution.methodDescription}`, () => {
                solutionBuilder.testCases.forEach(test => {
                  it(test.name, () => {
                    const returnValue = (solution.func as any)!(...test.input);
                    expect(returnValue).toEqual(test.output);
                  });
                });
              });
            }
          });
        });
      }
    });
  }
}

Object.keys(solutions).forEach(key => {
  Registry.solution(key, (solutions as any)[key]);
});

export { BenchmarkResults, Registry };
