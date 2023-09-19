import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '../__fixtures__', filename);

test('format stylish', () => {
  const answer = readFileSync(getFixturePath('correct-answer1.txt'), 'utf8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(answer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(answer);
});

test('format plain', () => {
  const answer = readFileSync(getFixturePath('correct-answer2.txt'), 'utf8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(answer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(answer);
});

test('format json', () => {
  const answer = readFileSync(getFixturePath('correct-answer3.txt'), 'utf8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(answer);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(answer);
});

test('wrong extname', () => {
  expect(() => {
    genDiff(getFixturePath('file-with-incorrect-extname.jsan'), getFixturePath('file2.json'), 'json');
  }).toThrow();
});

test('wrong style', () => {
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'jsan');
  }).toThrow();
});
