import { BenchmarkResults, Registry } from './registry';
import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import { execSync } from 'child_process';

const PRE_BUILD_FOLDER = path.join(__dirname, '../pre-build');
const DIST_FOLDER = path.join(__dirname, '../dist');
const DOCS_FOLDER = path.join(__dirname, '../docs');

const SCORE_PER_SUBMIT = 10;
const SCORE_RANKING_MULTIPLIER = 30;

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
    fs.mkdirSync(DOCS_FOLDER, { recursive: true });
    fs.mkdirSync(PRE_BUILD_FOLDER, { recursive: true });

    await Promise.all([
      Builder.copyPackage(benchmarkResults),
      Builder.createLibraryFile(benchmarkResults),
    ]);

    Builder.createDocs(benchmarkResults);
  }

  static async createLibraryFile(benchmarkResults: BenchmarkResults) {
    console.info(`Creating library file`);

    const fileContent = benchmarkResults.reduce(
      (fileContent: string, result) => {
        const winnerFunction = result.function.solutions.find(
          solution =>
            solution.owner === result.benchmarkResults.winnerSolution.owner
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
    await new Promise((resolve, reject) => {
      Builder.compiler.run((err, stats) => {
        console.log(stats.toString());

        if (err) return reject(err);

        resolve();
      });
    });
  }

  static async copyPackage(benchmarkResults: BenchmarkResults) {
    const top3Contributors = Builder.getTopContributors(benchmarkResults).slice(
      0,
      3
    );

    let winnersScript = fs.readFileSync(
      path.join(__dirname, '../template/npm/winners.js'),
      'utf8'
    );

    const contributorsLog = top3Contributors.reduce(
      (contributorsLog: string, contributor, i) => {
        contributorsLog += `console.log("🏆", "${i +
          1}.", "https://github.com/${contributor.name}", "Solution count: ${
          contributor.totalSolutions
        }", "Score: ${contributor.score}");`;
        return contributorsLog;
      },
      ''
    );

    winnersScript = winnersScript.replace(
      `{{replace_winners}}`,
      contributorsLog
    );

    console.log(path.join(DIST_FOLDER, './winners.js'));
    fs.writeFileSync(
      path.join(DIST_FOLDER, './winners.js'),
      winnersScript,
      'utf8'
    );

    fs.copyFileSync(
      path.join(__dirname, '../template/npm/package.json'),
      path.join(DIST_FOLDER, './package.json')
    );
    fs.copyFileSync(
      path.join(__dirname, '../README.md'),
      path.join(DIST_FOLDER, './README.md')
    );
  }

  static getTopContributors(benchmarkResults: BenchmarkResults) {
    const contributorList: Map<
      string,
      {
        name: string;
        totalSolutions: number;
        score: number;
      }
    > = new Map();
    benchmarkResults.forEach(result => {
      const benchSorted = result.benchmarkResults.benchmarks.sort(
        (a, b) => b.opsSec - a.opsSec
      );

      benchSorted.forEach((bench, i) => {
        const existingOwner = contributorList.get(bench.owner);

        if (existingOwner) {
          existingOwner.totalSolutions++;
          existingOwner.score +=
            SCORE_PER_SUBMIT +
            (benchSorted.length - 1 - i) * SCORE_RANKING_MULTIPLIER;
          contributorList.set(bench.owner, existingOwner);
        } else {
          contributorList.set(bench.owner, {
            name: bench.owner,
            totalSolutions: 1,
            score:
              SCORE_PER_SUBMIT +
              (benchSorted.length - 1 - i) * SCORE_RANKING_MULTIPLIER,
          });
        }
      });
    });

    return Array.from(contributorList.values()).sort(
      (a, b) => b.score - a.score
    );
  }

  private static createDocs(benchmarkResults: BenchmarkResults) {
    execSync(`mkdir -p ${DOCS_FOLDER}`);
    execSync(
      `cp -r ${path.join(__dirname, '../template/docs')}/* ${DOCS_FOLDER}`
    );

    const introduction = fs.readFileSync(
      path.join(DOCS_FOLDER, './introduction.md'),
      'utf8'
    );

    const introductionReplacedContent = introduction
      .replace(
        '{{currentVersion}}',
        require(path.join(DIST_FOLDER, './package.json')).version
      )
      .replace(
        '{{bundleSize}}',
        Builder.getFilesizeInBytes(
          path.join(DIST_FOLDER, './rapidash.min.js')
        ).toString()
      );

    fs.writeFileSync(
      path.join(DOCS_FOLDER, './introduction.md'),
      introductionReplacedContent,
      'utf8'
    );

    const functionTemplate = fs.readFileSync(
      path.join(__dirname, '../template/docs/function-template.md'),
      'utf8'
    );
    const functionsContent = fs.readFileSync(
      path.join(__dirname, '../template/docs/functions.md'),
      'utf8'
    );

    const functionList = benchmarkResults.reduce((markdownContent, fn) => {
      console.log(fn.benchmarkResults);

      const solutionDetails: Record<string, string> = {
        '{{solutionOwner}}': fn.benchmarkResults.winnerSolution.owner,
        '{{functionDescription}}': fn.function.descr,
        '{{functionExample}}': fn.function.examples
          .map(example => {
            return '```js\r\n' + example + '\r\n```\r\n';
          })
          .join(' '),
        '{{functionName}}': fn.function.name,
        '{{hz}}': Math.round(
          fn.benchmarkResults.winnerSolution.hz
        ).toLocaleString(),
        '{{benchData}}': JSON.stringify(fn.function.benchmarkInput).slice(
          1,
          -1
        ),
      };

      let functionMarkdownContent = functionTemplate;

      Object.keys(solutionDetails).forEach(key => {
        functionMarkdownContent = functionMarkdownContent.replace(
          new RegExp(key, 'g'),
          solutionDetails[key]
        );
      });

      return markdownContent + functionMarkdownContent;
    }, '');

    fs.writeFileSync(
      path.join(DOCS_FOLDER, './functions.md'),
      functionsContent.replace('{{functionsContent}}', functionList),
      'utf8'
    );

    const sideBarItem = `    * [{{functionName}}](functions.md#{{functionName}})`;

    const sideBarContent = fs.readFileSync(
      path.join(DOCS_FOLDER, './_sidebar.md'),
      'utf8'
    );

    fs.writeFileSync(
      path.join(DOCS_FOLDER, './_sidebar.md'),
      sideBarContent.replace(
        '{{sideBarItems}}',
        benchmarkResults
          .map(fn =>
            sideBarItem.replace(
              new RegExp('{{functionName}}', 'g'),
              fn.function.name
            )
          )
          .join('\r\n')
      )
    );

    const rankingContent = fs.readFileSync(
      path.join(DOCS_FOLDER, './rankings.md'),
      'utf8'
    );

    const topContributors = Builder.getTopContributors(benchmarkResults)
      .map(
        (solutionOwner, i) =>
          `| ${i + 1}  |    ![${solutionOwner.name}](https://github.com/${
            solutionOwner.name
          }.png?size=60)    | [${solutionOwner.name}](https://github.com/${
            solutionOwner.name
          }) |     ${solutionOwner.totalSolutions}     | ${
            solutionOwner.score
          }   |\r\n`
      )
      .join('');

    fs.writeFileSync(
      path.join(DOCS_FOLDER, './rankings.md'),
      rankingContent.replace(`{{rankings}}`, topContributors),
      'utf8'
    );
  }

  private static getFilesizeInBytes(path: string) {
    const stats = fs.statSync(path);
    return stats.size / 1000;
  }
}

Builder.build();
