import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const json1 = readFileSync(resolve(cwd(), filepath1), 'utf8');
  const json2 = readFileSync(resolve(cwd(), filepath2), 'utf8');
  const file1 = JSON.parse(json1);
  const file2 = JSON.parse(json2);

  const getStatusKeys = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    const result = keys.reduce((acc, key) => {
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          acc.push({ key, value: obj1[key], status: 'unchanged' });
        } else {
          acc.push({ key, value: obj1[key], status: 'deleted' });
          acc.push({ key, value: obj2[key], status: 'added' });
        }
      } else if (Object.hasOwn(obj1, key)) {
        acc.push({ key, value: obj1[key], status: 'deleted' });
      } else {
        acc.push({ key, value: obj2[key], status: 'added' });
      }

      return acc;
    }, []);

    return result;
  };

  const designer = (arrayWithStatus) => {
    const STATUSES = { unchanged: ' ', added: '+', deleted: '-' };
    const r = arrayWithStatus.map((string) => {
      const newString = `  ${STATUSES[string.status]} ${string.key}: ${string.value}`;
      return newString;
    });

    return `{\n${r.join('\n')}\n}`;
  };

  return designer(getStatusKeys(file1, file2));
};

export default genDiff;
