import _ from 'lodash';

const buildIndent = (indentSize) => {
  const symbol = ' ';
  return symbol.repeat(indentSize);
};

const prefixes = {
  first: '- ',
  second: '+ ',
  both: buildIndent(2),
};

const convertToColl = (obj) => _.toPairs(obj)
  .map(([key, value]) => ({ key, value }));

const formatColl = (coll, indentSize = 2) => {
  const buildNested = ({ value }) => {
    if (!_.isObject(value)) {
      return value;
    }
    const currentColl = _.isArray(value) ? value : convertToColl(value);
    return formatColl(currentColl, indentSize + 4);
  };

  const lines = coll
    .map((elem) => {
      const prefix = prefixes[elem.belongsToFile ?? 'both'];
      return `${buildIndent(indentSize)}${prefix}${elem.key}: ${buildNested(elem)}`;
    });

  return [
    '{',
    ...lines,
    `${buildIndent(indentSize - 2)}}`,
  ].join('\n');
};

export default formatColl;
