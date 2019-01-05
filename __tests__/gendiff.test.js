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
  expect(gendiff(before, after, 'tree')).toBe(fs.readFileSync(resultPath, 'utf-8'));
});

const beforeTreePath = '__tests__/__fixtures__/beforeTree';
const afterTreePath = '__tests__/__fixtures__/afterTree';
const resultTreePath = '__tests__/__fixtures__/resultTreee.txt';

const testsTreeSet = [
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.ini', '.ini'],
];

test.each(testsTreeSet)('test %s compared %s', (extension1, extension2) => {
  const before = `${beforeTreePath}${extension1}`;
  const after = `${afterTreePath}${extension2}`;
  expect(gendiff(before, after, 'tree')).toBe(fs.readFileSync(resultTreePath, 'utf-8'));
});

const resultPathPlain = '__tests__/__fixtures__/resultPlain.txt';
const testsPlainSet = [
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.ini', '.ini'],
];

test.each(testsPlainSet)('test %s compared %s', (extension1, extension2) => {
  const before = `${beforeTreePath}${extension1}`;
  const after = `${afterTreePath}${extension2}`;
  expect(gendiff(before, after, 'plain')).toBe(fs.readFileSync(resultPathPlain, 'utf-8'));
});