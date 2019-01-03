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

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = parse(pathToFile1);
  const fileContent2 = parse(pathToFile2);
  return getDiff(fileContent1, fileContent2);
};

export default genDiff;
