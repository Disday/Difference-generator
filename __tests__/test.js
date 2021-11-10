import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const data = [
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file1.yaml', 'file2.yml', 'stylish', 'stylish.txt'],
  ['file1.json', 'file2.yml', 'plain', 'plain.txt'],
  ['file1.json', 'file2.yml', 'json', 'json.json'],
];

test.each(data)('%s vs %s: %s', (filepath1, filepath2, format, resultPath) => {
  const absPath1 = buildPath(filepath1);
  const absPath2 = buildPath(filepath2);
  const expected = readFileSync(buildPath(resultPath), 'utf8');
  expect(genDiff(absPath1, absPath2, format)).toEqual(expected);
});

test('invalid file', () => {
  const filepath2 = buildPath('file2.json');
  const nonExistFile = buildPath('nonExistPath');
  expect(genDiff(nonExistFile, filepath2)).toContain('File not found');
  const wrongFormatFile = buildPath('file1.doc');
  expect(genDiff(wrongFormatFile, filepath2)).toContain('Unsupported format');
});

test('relative paths', () => {
  // const filepath2 = buildPath('file2.json');
  const expected = readFileSync(buildPath('stylish.txt'), 'utf8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
});
