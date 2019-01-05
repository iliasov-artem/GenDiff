import _ from 'lodash';

export const isObject = val => val === Object(val);

const makeAst = (fileContent1, fileContent2) => {
  const keys = _.union(Object.keys(fileContent1), Object.keys(fileContent2));
  const ast = keys.map((key) => {
    if (!_.has(fileContent1, key)) {
      return {
        key,
        type: 'added',
        currentValue: fileContent2[key],
      };
    }
    if (!_.has(fileContent2, key)) {
      return {
        key,
        type: 'removed',
        value: fileContent1[key],
      };
    }
    if (isObject(fileContent1[key]) && isObject(fileContent2[key])) {
      return {
        key,
        type: 'node',
        children: makeAst(fileContent1[key], fileContent2[key]),
      };
    }
    if (fileContent1[key] !== fileContent2[key]) {
      return {
        key,
        type: 'changed',
        previousValue: fileContent1[key],
        currentValue: fileContent2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: fileContent1[key],
    };
  });
  return ast;
};

export default makeAst;
