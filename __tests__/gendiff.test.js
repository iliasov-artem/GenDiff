
// const fs = require('fs');
import fs from 'fs';
import gendiff from '../src';

test('Compare JSON', () => {
  expect(gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8'));
});

test('Compare yaml', () => {
  expect(gendiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml')).toBe(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8'));
});
