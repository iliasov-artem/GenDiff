import { has } from 'lodash';

const isObject = val => val === Object(val);

const makeAst = (fileContent1, fileContent2) => {
  const allKeys = Object.keys({ ...fileContent1, ...fileContent2 });
  const ast = allKeys.map((key) => {
    if (isObject(fileContent1[key]) && isObject(fileContent2[key])) {
      return {
        key,
        status: 'node',
        children: makeAst(fileContent1[key], fileContent2[key]),
      };
    }
    if (!has(fileContent1, key)) {
      return {
        key,
        status: 'added',
        value: fileContent2[key],
      };
    }
    if (!has(fileContent2, key)) {
      return {
        key,
        status: 'removed',
        value: fileContent1[key],
      };
    }
    if (fileContent1[key] !== fileContent2[key]) {
      return {
        key,
        status: 'changed',
        beforeValue: fileContent1[key],
        value: fileContent2[key],
      };
    }
    return {
      key,
      status: 'unchanged',
      value: fileContent1[key],
    };
  });
  return ast;
};

export default makeAst;