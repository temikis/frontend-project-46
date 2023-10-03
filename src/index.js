import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parsers.js';
import getDifference from './diff.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(cwd(), filepath);

const getFormat = (filepath) => extname(filepath).toLowerCase().slice(1);

const getData = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);

  return parse(readFileSync(absolutePath, 'utf8'), getFormat(filepath));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  return format(getDifference(data1, data2), formatName);
};

export default genDiff;
