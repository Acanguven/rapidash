import {Suite} from 'benchmark';
import {Solution} from './solution';

const cliTable = require('cli-table');

interface BenchmarkReport {
  winnerSolution: {
    owner: string;
    hz: number;
  };
  benchmarks: Array<{
    text: string;
    opsSec: number;
    owner: string;
  }>;
}

class Benchmark {
  private solutions: Solution[];
  private suite: Suite;
  private benchParams: unknown[][];
  private name: string;

  constructor(solutions: Solution[], benchParams: unknown[][], name: string) {
    this.solutions = solutions;
    this.suite = new Suite();
    this.benchParams = benchParams;
    this.name = name;
  }

  async run(): Promise<BenchmarkReport> {
    let defer: (winner: BenchmarkReport) => void;
    this.solutions.forEach(solution => {
      const benchFunctions = this.benchParams.map(params => ({
        fn: solution.func.bind(
          null,
          ...params
        ),
        case: `${this.name}(${JSON.stringify(params).slice(
          1,
          -1
        )})`
      }));

      benchFunctions.forEach(bench => {
        this.suite.add(`${solution.owner} - ${bench.case}`, () => {
          bench.fn();
        });
      })
    });

    this.suite.on('complete', () => {
      const fastest = this.suite.filter('fastest');

      const table = new cliTable({
        head: ['Solution Owner', 'Test Case', 'ops/sec']
      });

      this.suite.forEach((bench: any) => {
        const [owner, testCase] = bench.name.split(' - ');
        table.push([owner, testCase, Math.round(
          bench.hz
        ).toLocaleString()]);
      });

      const benchAverages = this.suite.map((bench: any) => {
        const [owner] = bench.name.split(' - ');
        const totalTests = this.suite.filter((suite: any) => suite.name.startsWith(`${owner} -`));
        const hz = totalTests.reduce((avg: number, c: any) => avg + c.hz, 0) / totalTests.length;

        return {
          name: owner,
          hz,
          text: Math.round(
            hz
          ).toLocaleString(),
        }
      }).sort((a, b) => b.hz - a.hz);

      console.log(table.toString());
      console.log('🏆', `Fastest solution owner: ${benchAverages[0].name} with average ops/sec ${benchAverages[0].text}`);
      console.log('');
      console.log('');
      console.log('');

      defer({
        winnerSolution: {
          owner: benchAverages[0].name,
          hz: benchAverages[0].hz,
        },
        benchmarks: benchAverages.map((bench: any) => ({
          text: bench.text,
          opsSec: bench.hz,
          owner: bench.name,
        })),
      });
    });

    this.suite.on('cycle', (event: any) => {
      console.log('⚡', event.target.toString());
    });

    return new Promise<BenchmarkReport>(resolve => {
      defer = resolve;
      console.log('🏎️', ` Starting benchmarks for ${this.name}`);
      this.suite.run({async: true});
    });
  }
}

export {Benchmark, BenchmarkReport};
