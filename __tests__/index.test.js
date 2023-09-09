import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

test('genDiff', () => {
  const answer = readFileSync(getFixturePath('correct-answer1.txt'), 'utf8');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(answer);
});
