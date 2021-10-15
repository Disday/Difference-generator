import { existsSync, readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const buildAbsPath = (filepath) => path.resolve(process.cwd(), filepath);

const parse = (filepath, ext) => {
  const parsers = { '.json': JSON.parse, };
  const parserFunc = parsers[ext];
  return parserFunc(filepath);
};

export default (path1, path2, options) => {
  const filepath1 = buildAbsPath(path1);
  const filepath2 = buildAbsPath(path2);
  if (!existsSync(filepath1) || !existsSync(filepath2)) {
    return `File not found - ${filepath1}`;
  }
  const file1Content = readFileSync(filepath1, 'utf8');
  const file2Content = readFileSync(filepath2, 'utf8');
  const obj1 = parse(file1Content, path.extname(filepath1));
  const obj2 = parse(file2Content, path.extname(filepath2));

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const output = _.sortBy(keys).map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const val1Output = `- ${key}: ${val1}`;
    const val2Output = `+ ${key}: ${val2}`;

    if (_.has(obj1, key) && _.has(obj2, key)) {
      const equal = `  ${key}: ${val1}`;
      const diff = [`${val1Output}`, `${val2Output}`];
      return val1 === val2 ? equal : diff;
    }
    return _.has(obj1, key) ? val1Output : val2Output;
  });

  const result = output.flat().join('\n  ');
  return `{\n  ${result}\n}`;
};
