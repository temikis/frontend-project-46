import _ from 'lodash';

const handler = (rawValue) => {
  if (_.isObject(rawValue)) return '[complex value]';
  if (typeof rawValue === 'string') return `'${rawValue}'`;

  return rawValue;
};

const iter = (currentValue, path = '') => {
  const lines = currentValue.flatMap(({ state, key, value }) => {
    const newPath = path ? `${path}.${key}` : key;
    switch (state) {
      case 'compare':
        return iter(value, newPath);
      case 'added':
        return `Property '${newPath}' was added with value: ${handler(value)}`;
      case 'deleted':
        return `Property '${newPath}' was removed`;
      case 'updated':
        return `Property '${newPath}' was updated. From ${handler(value[0])} to ${handler(value[1])}`;
      default:
    }
    return null;
  });

  return lines.filter(Boolean);
};

const plain = (arrayWithState) => iter(arrayWithState).join('\n');

export default plain;
