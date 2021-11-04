import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

const buildAbsPath = (filepath) => path.resolve(process.cwd(), filepath);

const makeDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const diffKeys = keys
    .sort()
    .flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isObject(value1) && _.isObject(value2)) {
        const children = makeDiff(value1, value2);
        return { key, value: children };
      }

      if (_.has(obj1, key) && _.has(obj2, key)) {
        const equalOuput = { key, value: value1 };
        const diffOutput = [
          { key, value: value1, belongsToFile: 'first' },
          { key, value: value2, belongsToFile: 'second' },
        ];
        return value1 === value2 ? equalOuput : diffOutput;
      }

      const value = _.has(obj1, key) ? value1 : value2;
      const belongsToFile = _.has(obj1, key) ? 'first' : 'second';
      return { key, value, belongsToFile };
    });
  // return { key: 'diff', children: result, belongsToObj: 'both'};
  return diffKeys;
};

export default (path1, path2, format = 'stylish') => {
  const filepath1 = buildAbsPath(path1);
  const filepath2 = buildAbsPath(path2);
  if (!existsSync(filepath1)) {
    return `File not found: ${filepath1}`;
  }
  if (!existsSync(filepath2)) {
    return `File not found: ${filepath2}`;
  }
  const file1Content = readFileSync(filepath1, 'utf8');
  const file2Content = readFileSync(filepath2, 'utf8');

  try {
    const obj1 = parse(file1Content, path.extname(filepath1));
    const obj2 = parse(file2Content, path.extname(filepath2));
    const diff = makeDiff(obj1, obj2);
    // writeFileSync('log.json', JSON.stringify(diff)); // log
    writeFileSync('log1.txt', formatDiff(diff, format)); // log
    return formatDiff(diff, format);
  } catch (e) {
    return e.message;
  }
};
