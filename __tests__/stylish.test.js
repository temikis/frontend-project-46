import stylish from '../src/formatters/stylish.js';

const arrayWithWrongState = [
  {
    state: 'wrong',
    key: 'key',
    value: false,
  },
];

test('should be throw error when receiving a non-existent node type', () => {
  expect(() => {
    stylish(arrayWithWrongState);
  }).toThrow();
});
