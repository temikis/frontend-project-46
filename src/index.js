import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname, basename } from 'node:path';
import parse from './parsers.js';
import getDifference from './diff.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(cwd(), filepath);

const getExtname = (filepath) => {
  const extension = extname(filepath);
  const name = basename(filepath);

  return extension ? extension.toLowerCase().slice(1) : name.toLowerCase();
};

const getData = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const extension = getExtname(filepath);
  const file = readFileSync(absolutePath, 'utf8');
  const data = parse(file, extension);

  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  return format(getDifference(data1, data2), formatName);
};

export default genDiff;
