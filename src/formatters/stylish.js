import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const getBracketIndent = (depth) => REPLACER.repeat(SPACE_COUNT * depth);
const getCurrentIndent = (depth) => REPLACER.repeat(depth * SPACE_COUNT + 2);

const getString = (lines, depth) => `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const lines = keys.map((key) => `${getCurrentIndent(depth)}  ${key}: ${stringify(value[key], depth + 1)}`);

  return getString(lines, depth);
};

const iter = (array, depth) => {
  const lines = array.map((element) => {
    const { type, key } = element;
    switch (type) {
      case 'added':
        return `${getCurrentIndent(depth)}+ ${key}: ${stringify(element.value, depth + 1)}`;
      case 'deleted':
        return `${getCurrentIndent(depth)}- ${key}: ${stringify(element.value, depth + 1)}`;
      case 'unchanged':
        return `${getCurrentIndent(depth)}  ${key}: ${stringify(element.value, depth + 1)}`;
      case 'nested':
        return `${getCurrentIndent(depth)}  ${key}: ${iter(element.children, depth + 1)}`;
      case 'updated':
        const line1 = `${getCurrentIndent(depth)}- ${key}: ${stringify(element.value1, depth + 1)}`;
        const line2 = `${getCurrentIndent(depth)}+ ${key}: ${stringify(element.value2, depth + 1)}`;
        return `${line1}\n${line2}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return getString(lines, depth);
};

const format = (arrayWithState) => iter(arrayWithState, 0);

export default format;
