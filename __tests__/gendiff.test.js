import fs from 'fs';
import gendiff from '../src';

const beforePath = '__tests__/__fixtures__/before';
const afterPath = '__tests__/__fixtures__/after';
const resultPath = '__tests__/__fixtures__/result.txt';
const testsSet = [
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.ini', '.ini'],
];

test.each(testsSet)('test %s compared %s', (extension1, extension2) => {
  const before = `${beforePath}${extension1}`;
  const after = `${afterPath}${extension2}`;
  expect(gendiff(before, after)).toBe(fs.readFileSync(resultPath, 'utf-8'));
});
/*
const beforeTreePath = '__tests__/__fixtures__/beforeTree.json';
const afterTreePath = '__tests__/__fixtures__/afterTree.json';
const resultTreePath = '__tests__/__fixtures__/resultTreee.txt';

test('comparing tree', expect(gendiff(beforeTreePath, afterTreePath)).toBe(fs.readFileSync(resultTreePath, 'utf-8')));
*/
