import parse from '../src/parsers.js';

const data = [];

test('should be throw error when receiving a non-existent extname', () => {
  expect(() => {
    parse(data, 'jsan');
  }).toThrow();
});

test('should be throw error when extname missing', () => {
  expect(() => {
    parse(data);
  }).toThrow();
});
