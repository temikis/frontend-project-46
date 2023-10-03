import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const getBracketIndent = (depth) => REPLACER.repeat(SPACE_COUNT * (depth - 1));
const getCurrentIndent = (depth) => REPLACER.repeat(depth * SPACE_COUNT - 2);

const getString = (lines, depth) => ([
  '{',
  ...lines,
  `${getBracketIndent(depth)}}`,
].join('\n'));

const handler = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const lines = keys.map((key) => `${getCurrentIndent(depth)}  ${key}: ${handler(value[key], depth + 1)}`);

  return getString(lines, depth);
};

const iter = (array, depth) => {
  const lines = array.map((element) => {
    const {
      type, key, children, value, value1, value2,
    } = element;
    switch (type) {
      case 'added':
        return `${getCurrentIndent(depth)}+ ${key}: ${handler(value, depth + 1)}`;
      case 'deleted':
        return `${getCurrentIndent(depth)}- ${key}: ${handler(value, depth + 1)}`;
      case 'unchanged':
        return `${getCurrentIndent(depth)}  ${key}: ${handler(value, depth + 1)}`;
      case 'nested':
        return `${getCurrentIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
      case 'updated':
        return `${getCurrentIndent(depth)}- ${key}: ${handler(value1, depth + 1)}\n${getCurrentIndent(depth)}+ ${key}: ${handler(value2, depth + 1)}`;
      default:
        throw new Error('Unknown type');
    }
  });

  return getString(lines, depth);
};

const stylish = (arrayWithState) => iter(arrayWithState, 1);

export default stylish;
