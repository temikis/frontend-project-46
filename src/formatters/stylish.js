import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const getBracketIndent = (depth) => REPLACER.repeat(SPACE_COUNT * (depth - 1));
const getCurrentIndent = (depth) => REPLACER.repeat(depth * SPACE_COUNT - 2);

const stylish = (arrayWithState) => {
  const iter = (currentValue, depth) => {
    let lines;

    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    if (!_.isArray(currentValue)) {
      const keys = Object.keys(currentValue);
      lines = keys.map((key) => {
        const line = `${getCurrentIndent(depth)}  ${key}: ${iter(currentValue[key], depth + 1)}`;
        return line;
      });
    } else {
      lines = currentValue.map((element) => {
        const { key, value, state } = element;
        switch (state) {
          case 'added':
            return `${getCurrentIndent(depth)}+ ${key}: ${iter(value, depth + 1)}`;
          case 'deleted':
            return `${getCurrentIndent(depth)}- ${key}: ${iter(value, depth + 1)}`;
          case 'unchanged':
          case 'compare':
            return `${getCurrentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`;
          case 'updated':
            return `${getCurrentIndent(depth)}- ${key}: ${iter(value[0], depth + 1)}\n${getCurrentIndent(depth)}+ ${key}: ${iter(value[1], depth + 1)}`;
          default:
            throw new Error('Unknown state');
        }
      });
    }

    return [
      '{',
      ...lines,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };

  return iter(arrayWithState, 1);
};

export default stylish;
