
const fs = require('fs');
const gendiff = require('../src').default;

const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

test('Compare JSON', () => {
  expect(gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(expected);
});
