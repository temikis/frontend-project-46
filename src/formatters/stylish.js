import _ from 'lodash';

const SPACE_COUNT = 4;
const REPLACER = ' ';

const stylish = (arrayWithState) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * SPACE_COUNT;
    const currentIndent = REPLACER.repeat(indentSize - 2);
    const bracketIndent = REPLACER.repeat(indentSize - SPACE_COUNT);

    if (!_.isArray(currentValue)) {
      const keys = Object.keys(currentValue);
      const lines = keys.map((key) => {
        const line = `${currentIndent}  ${key}: ${iter(currentValue[key], depth + 1)}`;
        return line;
      });

      return [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');
    }
    const lines = currentValue.map((element) => {
      const {
        key, value, value1, value2, state,
      } = element;

      switch (state) {
        case 'added':
          return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`;
        case 'unchanged':
        case 'compare':
          return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${iter(value1, depth + 1)}\n${currentIndent}+ ${key}: ${iter(value2, depth + 1)}`;
        default:
          throw new Error('Unknown state');
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(arrayWithState, 1);
};

export default stylish;
