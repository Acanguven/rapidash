import {BenchmarkResults, Registry} from './registry';
import * as fs from "fs";
import * as path from "path";
import * as webpack from 'webpack';


class Builder {
  static compiler = webpack({
    entry: './pre-build/rapidash.js',
    output:
      {
        libraryTarget: 'commonjs',
        filename: 'rapidash.min.js',
        path: path.join(__dirname, '../dist'),
      }
    ,
    mode: "production",
  });

  static async benchmark() {
    return Registry
      .benchmarkWinners();
  }

  static async build() {
    const benchmarkResults = await this.benchmark();
    await Promise.all([
      Builder.createPage(benchmarkResults),
      Builder.createLibraryFile(benchmarkResults),
    ])

  }

  static async createLibraryFile(benchmarkResults: BenchmarkResults) {
    console.info(`Creating library file`);

    const fileContent = benchmarkResults.reduce((fileContent: string, result) => {
      const winnerFunction = result.function.solutions.find(solution => solution.owner === result.benchmarkResults.winner);
      fileContent += `export const ${result.function.name}=${winnerFunction!.func.toString()};`
      return fileContent;
    }, '');

    fs.mkdirSync(path.join(__dirname, '../pre-build'), {recursive: true});
    fs.writeFileSync(path.join(__dirname, '../pre-build/rapidash.js'), fileContent, 'utf8');

    console.info(`Compiling library file to target commonjs`);
    Builder.compiler.run((err, stats) => {
      console.log(stats.toString())
    });
  }

  static async createPage(benchmarkResults: BenchmarkResults) {
    console.info(`Creating github pages file`);
  }

  static getWinner() {

  }
}

Builder
  .build();


