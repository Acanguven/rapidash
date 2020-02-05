import * as jest from 'jest';
import * as path from 'path';
import { Registry } from './registry';

const options = {
  projects: [path.join(__dirname, '../')],
} as any;

if (!process.argv[2]) {
  console.log('❌', 'Example Usage: npm run solution max');
  process.exit(0);
}

if (process.argv[2]) {
  console.log('❓', 'Solution Name:', process.argv[2]);
}

if (process.argv[3]) {
  console.log('🙋', 'Owner', process.argv[3]);
} else {
  console.log(
    '💡',
    'Add second argument solution owner name for testing only your solution'
  );
  console.log('💡', 'Example: npm run solution max acanguven');
}

console.log('');
console.log('');

jest.runCLI(options, options.projects).then(success => {
  if (success.results.numFailedTests === 0) {
    Registry.benchmarkWinners();
  }
});
