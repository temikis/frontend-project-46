import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '../__fixtures__', filename);
const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yaml');
const answerStylish = readFileSync(getFixturePath('correct-answer-stylish.txt'), 'utf8');
const answerPlain = readFileSync(getFixturePath('correct-answer-plain.txt'), 'utf8');
const answerJson = readFileSync(getFixturePath('correct-answer-json.txt'), 'utf8');

test('format stylish', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'stylish')).toEqual(answerStylish);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'stylish')).toEqual(answerStylish);
});

test('format plain', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'plain')).toEqual(answerPlain);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'plain')).toEqual(answerPlain);
});

test('format json', () => {
  expect(genDiff(jsonFilepath1, jsonFilepath2, 'json')).toEqual(answerJson);
  expect(genDiff(yamlFilepath1, yamlFilepath2, 'json')).toEqual(answerJson);
});

test('wrong extname', () => {
  expect(() => {
    genDiff(getFixturePath('file-with-incorrect-extname.jsan'), jsonFilepath2, 'json');
  }).toThrow();
});

test('wrong style', () => {
  expect(() => {
    genDiff(jsonFilepath1, jsonFilepath2, 'jsan');
  }).toThrow();
});
