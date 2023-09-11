import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import yaml from 'js-yaml';

/**
* Parsers accepts files in .json .yml .yaml format.
* Returns file data in Object format.
*/

const parse = (filepath) => {
  let obj;
  let data;

  try {
    data = readFileSync(resolve(cwd(), filepath), 'utf8');
  } catch (e) {
    console.log(e);
  }

  switch (extname(filepath).toLowerCase()) {
    case '.json':
      obj = JSON.parse(data);
      break;
    case '.yml':
    case '.yaml':
      obj = yaml.load(data);
      break;
    default:
      throw new Error(`Unknown file extension: '${extname(filepath)}'!`);
  }

  return obj;
};

export default (filepath1, filepath2) => [parse(filepath1), parse(filepath2)];
