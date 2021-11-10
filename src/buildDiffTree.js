import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys
    .sort()
    .flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      
      if (_.isObject(value1) && _.isObject(value2)) {
        const children = buildDiffTree(value1, value2);
        return { key, value: children, state: 'unchanged' };
      }

      if (_.has(obj1, key) && _.has(obj2, key)) {
        const updated = { key, value: [value1, value2], state: 'updated' };
        const unchanged = { key, value: value1, state: 'unchanged' };
        return value1 === value2 ? unchanged : updated;
      }
      const value = _.has(obj1, key) ? value1 : value2;
      const state = _.has(obj1, key) ? 'removed' : 'added';
      return { key, value, state };
    });
};
export default buildDiffTree;