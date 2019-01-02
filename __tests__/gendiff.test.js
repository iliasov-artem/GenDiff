import fs from 'fs';
import gendiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/result.txt');

test('Compare JSON', () => {
  expect(gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(expected);
});
