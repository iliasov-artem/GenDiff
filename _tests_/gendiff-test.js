import fs from 'fs';
import gendiff from '../src';

const expected = fs.readFileSync('_tests_/_fixtures_/result.txt');

test('Compare JSON', () => {
  expected(gendiff('_tests_/_fixtures_/before.json', '_tests_/_fixtures_/after.json')).toBe(expected);
});
