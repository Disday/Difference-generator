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
  // ['file1.json', 'file2.yml', 'stylish.txt'],
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

// test('tree json', () => {
//   const filepath1 = buildPath('file1.json');
//   const filepath2 = buildPath('file2.json');
//   const diff = readFileSync(buildPath('result.txt'), 'utf8');
//   expect(genDiff(filepath1, filepath2)).toBe(diff);
//   expect(genDiff('__fixtures__/file1.json', filepath2)).toBe(diff);
// });

// test('tree yaml', () => {
//   const filepath1 = buildPath('file1.yaml');
//   const filepath2 = buildPath('file2.yml');
//   const diff = readFileSync(buildPath('result.txt'), 'utf8');
//   expect(genDiff(filepath1, filepath2)).toBe(diff);
//   // expect(genDiff('__fixtures__/dataset1/file1.json', filepath2)).toBe(diff);
// });
