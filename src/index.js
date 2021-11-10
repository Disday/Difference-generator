import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const buildAbsPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  if (!existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}`);
  }
  return readFileSync(filepath, 'utf8');
};

export default (path1, path2, format = 'stylish') => {
  const filepath1 = buildAbsPath(path1);
  const filepath2 = buildAbsPath(path2);
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);
  const obj1 = parse(file1Content, path.extname(filepath1));
  const obj2 = parse(file2Content, path.extname(filepath2));
  const diff = buildDiffTree(obj1, obj2);
  writeFileSync('log.json', JSON.stringify(diff)); // log
  // writeFileSync('log.txt', formatDiff(diff, format)); // log
  return formatDiff(diff, format);
};

// export default (...args) => {
//   try {
//     return genDiff(...args);
//   } catch (e) {
//     return e.customError ?? e;
//   }
// };
