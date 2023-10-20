import plain from '../src/formatters/plain.js';

const arrayWithWrongState = [
  {
    state: 'wrong',
    key: 'key',
    value: false,
  },
];

test('should be throw error when receiving a non-existent node type', () => {
  expect(() => {
    plain(arrayWithWrongState);
  }).toThrow();
});
