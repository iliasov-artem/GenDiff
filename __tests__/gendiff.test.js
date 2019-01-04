import fs from 'fs';
import gendiff from '../src';

const beforePath = '__tests__/__fixtures__/before';
const afterPath = '__tests__/__fixtures__/after';
const testsSet = [
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.ini', '.ini'],
];

test.each(testsSet)('test %s compared %s', (extension1, extension2) => {
  const before = `${beforePath}${extension1}`;
  const after = `${afterPath}${extension2}`;
  expect(gendiff(before, after)).toBe(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8'));
});
