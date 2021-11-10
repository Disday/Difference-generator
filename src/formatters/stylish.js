import isArray from 'lodash/isArray.js';
import isObject from 'lodash/isObject.js';

const buildIndent = (indentSize) => ' '.repeat(indentSize);

const prefixes = {
  removed: '- ',
  added: '+ ',
  updated: buildIndent(2),
  unchanged: buildIndent(2),
};

const convertToColl = (obj) =>
  Object
    .entries(obj)
    .map(([key, value]) => ({ key, value }));

const formatTree = (tree, indentSize = 2) => {
  const buildNested = ({ value }) => {
    if (!isObject(value)) {
      return value;
    }
    const currentColl = isArray(value) ? value : convertToColl(value);
    return formatTree(currentColl, indentSize + 4);
  };

  const buildLine = (prefix, elem) => `${buildIndent(indentSize)}${prefix}${elem.key}: ${buildNested(elem)}`;

  const lines = tree
    .flatMap((elem) => {
      if (elem.state === 'updated') {
        const { key, value: [value1, value2] } = elem;
        const { removed: prefix1, added: prefix2 } = prefixes;
        return [
          buildLine(prefix1, { key, value: value1 }),
          buildLine(prefix2, { key, value: value2 }),
        ];
      }
      const prefix = prefixes[elem.state ?? 'unchanged'];
      return buildLine(prefix, elem);
    });

  return [
    '{',
    ...lines,
    `${buildIndent(indentSize - 2)}}`,
  ].join('\n');
};

export default formatTree;
