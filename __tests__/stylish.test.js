import stylish from '../src/formatters/stylish.js';

const arrayWithWrongState = [
  {
    state: 'wrong',
    key: 'key',
    value: false,
  },
];

test('module test: wrong state', () => {
  expect(() => {
    stylish(arrayWithWrongState);
  }).toThrow();
});
