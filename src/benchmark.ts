import { Suite } from 'benchmark';
import { Solution } from './solution';

interface BenchmarkReport {
  winner: string;
  benchmarks: Array<{
    text: string;
    opsSec: number;
  }>;
}

class Benchmark {
  private solutions: Solution[];
  private suite: Suite;
  private benchParams: unknown[];
  private name: string;

  constructor(solutions: Solution[], benchParams: unknown[], name: string) {
    this.solutions = solutions;
    this.suite = new Suite();
    this.benchParams = benchParams;
    this.name = name;
  }

  async run(): Promise<BenchmarkReport> {
    let defer: (winner: BenchmarkReport) => void;
    this.solutions.forEach(solution => {
      const solutionBoundHandler = solution.func.bind(
        null,
        ...this.benchParams
      );

      this.suite.add(solution.owner, () => {
        solutionBoundHandler();
      });
    });

    this.suite.on('complete', () => {
      defer({
        winner: this.suite.filter('fastest').map('name' as any)[0] as string,
        benchmarks: this.suite.map((bench: any) => ({
          text: bench.toString(),
          opsSec: bench.hz,
        })),
      });
    });

    this.suite.on('cycle', (event: any) => {
      console.info(event.target.toString());
    });

    return new Promise<BenchmarkReport>(resolve => {
      defer = resolve;
      console.info(`Starting benchmarks for ${this.name}`);
      this.suite.run({ async: true });
    });
  }
}

export { Benchmark, BenchmarkReport };
