import { has } from 'lodash';
import parse from './parsers';

const getDiff = (file1, file2) => {
  const allKeys = Object.keys({ ...file1, ...file2 });
  const result = allKeys.reduce((acc, key) => {
    if (!has(file1, key)) {
      return [...acc, `  + ${key}: ${file2[key]}`];
    }
    if (!has(file2, key)) {
      return [...acc, `  - ${key}: ${file1[key]}`];
    }
    if (file1[key] === file2[key]) {
      return [...acc, `    ${key}: ${file1[key]}`];
    }
    return [...acc, `  + ${key}: ${file2[key]}\n  - ${key}: ${file1[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n}\n`;
};

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  return getDiff(file1, file2);
};

export default genDiff;
