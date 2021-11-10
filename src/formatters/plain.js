import isArray from 'lodash/isArray.js';
import isPlainObject from 'lodash/isPlainObject.js';

const stringify = (data) => {
  if (isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const buildLine = (path, { value, state }) => {
  const templates = {
    removed: `Property '${path}' was removed`,
    added: `Property '${path}' was added with value: ${stringify(value)}`,
    updated: `Property '${path}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`,
    unchanged: null,
  };
  return templates[state];
};

const buildLines = (tree, pathParts = []) => {
  const iter = (acc, elem) => {
    const { key, value, state } = elem;
    const currentPathParts = [key, ...pathParts];
    if (state !== 'updated' && isArray(value)) {
      const nested = buildLines(value, currentPathParts);
      return [...acc, ...nested];
    }
    const path = currentPathParts
      .reverse()
      .join('.');
    const line = buildLine(path, elem);
    return [...acc, line];
  };

  return tree
    .reduce(iter, [])
    .filter((elem) => elem);
};

export default (tree) => buildLines(tree).join('\n');
