import _ from 'lodash';

const makeAst = (firstConfigTree, secondConfigTree) => {
  const keys = _.union(Object.keys(firstConfigTree), Object.keys(secondConfigTree));
  const ast = keys.map((key) => {
    if (!_.has(firstConfigTree, key)) {
      return {
        key,
        type: 'added',
        currentValue: secondConfigTree[key],
      };
    }
    if (!_.has(secondConfigTree, key)) {
      return {
        key,
        type: 'removed',
        value: firstConfigTree[key],
      };
    }
    if (_.isObject(firstConfigTree[key]) && _.isObject(secondConfigTree[key])) {
      return {
        key,
        type: 'node',
        children: makeAst(firstConfigTree[key], secondConfigTree[key]),
      };
    }
    if (firstConfigTree[key] !== secondConfigTree[key]) {
      return {
        key,
        type: 'changed',
        previousValue: firstConfigTree[key],
        currentValue: secondConfigTree[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: firstConfigTree[key],
    };
  });
  return ast;
};

export default makeAst;
