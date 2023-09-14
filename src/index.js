import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parsers from './parsers.js';
import getDifference from './diff.js';
import designer from './designer.js';

const getData = (filepath) => {
  let data;

  try {
    data = readFileSync(resolve(cwd(), filepath), 'utf8');
  } catch (e) {
    console.log(e);
  }

  return data;
};
const getExtname = (filepath) => extname(filepath).toLowerCase();

const genDiff = (filepath1, filepath2, format) => {
  const file1 = parsers(getData(filepath1), getExtname(filepath1));
  const file2 = parsers(getData(filepath2), getExtname(filepath2));

  return designer(getDifference(file1, file2), format);
};

export default genDiff;
