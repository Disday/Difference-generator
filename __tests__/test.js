import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, '..', '__fixtures__');

test('non-existing file', () => {
  const filepath1 = path.join(fixturesDir, 'wrongPathToFile');
  const filepath2 = path.join(fixturesDir, 'dataset1', 'file2.json');
  expect(genDiff(filepath1, filepath2)).toContain('File not found');
});

test('plain files', () => {
  const filepath1 = path.join(fixturesDir, 'dataset1', 'file1.json');
  const filepath2 = path.join(fixturesDir, 'dataset1', 'file2.json');
  const diff = readFileSync(path.join(fixturesDir, 'dataset1', 'result.txt'), 'utf8');
  expect(genDiff(filepath1, filepath2)).toBe(diff);
  expect(genDiff('__fixtures__/dataset1/file1.json', filepath2)).toBe(diff);
});
