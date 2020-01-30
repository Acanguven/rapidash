import { BenchmarkResults, Registry } from './registry';
import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';

const PRE_BUILD_FOLDER = path.join(__dirname, '../pre-build');
const DIST_FOLDER = path.join(__dirname, '../dist');

class Builder {
  static compiler = webpack({
    entry: './pre-build/rapidash.js',
    output: {
      globalObject: 'this',
      libraryTarget: 'umd',
      library: 'rapidash',
      filename: 'rapidash.min.js',
      path: DIST_FOLDER,
    },
    mode: 'production',
  });

  static async benchmark() {
    return Registry.benchmarkWinners();
  }

  static async build() {
    const benchmarkResults = await this.benchmark();
    fs.mkdirSync(DIST_FOLDER, { recursive: true });
    await Promise.all([
      Builder.copyPackage(benchmarkResults),
      Builder.createLibraryFile(benchmarkResults),
    ]);
  }

  static async createLibraryFile(benchmarkResults: BenchmarkResults) {
    console.info(`Creating library file`);

    const fileContent = benchmarkResults.reduce(
      (fileContent: string, result) => {
        const winnerFunction = result.function.solutions.find(
          solution => solution.owner === result.benchmarkResults.winner
        );
        fileContent += `export const ${
          result.function.name
        }=${winnerFunction!.func.toString()};`;
        return fileContent;
      },
      ''
    );

    fs.writeFileSync(
      path.join(PRE_BUILD_FOLDER, './rapidash.js'),
      fileContent,
      'utf8'
    );

    console.info(`Compiling library file to target commonjs`);
    Builder.compiler.run((err, stats) => {
      console.log(stats.toString());
    });
  }

  static async copyPackage(benchmarkResults: BenchmarkResults) {
    const top3Contributors = Builder.getTop3Contributors(benchmarkResults);
    let winnersScript = fs.readFileSync(
      path.join(__dirname, '../template/winners.js'),
      'utf8'
    );
    const contributorsLog = top3Contributors.reduce(
      (contributorsLog: string, contributor, i) => {
        contributorsLog += `console.log("🏆", "${i +
          1}.", "https://github.com/${contributor.name}", "Solution count: ${
          contributor.count
        }")`;
        return contributorsLog;
      },
      ''
    );
    winnersScript = winnersScript.replace(
      `//replace_winners//`,
      contributorsLog
    );

    fs.writeFileSync(
      path.join(DIST_FOLDER, './winners.js'),
      winnersScript,
      'utf8'
    );
  }

  static getTop3Contributors(benchmarkResults: BenchmarkResults) {
    const winnerList: Map<string, { name: string; count: number }> = new Map();
    benchmarkResults.forEach(result => {
      const existing = winnerList.get(result.benchmarkResults.winner);
      if (!existing) {
        winnerList.set(result.benchmarkResults.winner, {
          name: result.benchmarkResults.winner,
          count: 1,
        });
      } else {
        existing.count++;
        winnerList.set(result.benchmarkResults.winner, existing);
      }
    });

    return Array.from(winnerList.values())
      .sort((a, b) => a.count - b.count)
      .slice(0, 3);
  }
}

Builder.build();
