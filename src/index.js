import path from 'path';
import fs from 'fs';
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
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileExtension1 = path.extname(pathToFile1).slice(1);
  const fileAsObject1 = parse(fileContent1, fileExtension1);
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const fileExtension2 = path.extname(pathToFile2).slice(1);
  const fileAsObject2 = parse(fileContent2, fileExtension2);
  return getDiff(fileAsObject1, fileAsObject2);
};

export default genDiff;
