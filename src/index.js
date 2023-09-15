import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parsers from './parsers.js';
import getDifference from './diff.js';
import formatters from './formatters/index.js';

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

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = parsers(getData(filepath1), getExtname(filepath1));
  const file2 = parsers(getData(filepath2), getExtname(filepath2));
  // console.log(JSON.stringify(getDifference(file1, file2), null, 2));

  return formatters(getDifference(file1, file2), formatName);
};

export default genDiff;
