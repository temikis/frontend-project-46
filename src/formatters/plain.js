import _ from 'lodash';

const handler = (rawValue) => {
  if (_.isObject(rawValue)) return '[complex value]';
  if (typeof rawValue === 'string') return `'${rawValue}'`;

  return rawValue;
};

const iter = (currentValue, path = '') => {
  const lines = currentValue.flatMap(({
    type, key, value, value1, value2, children,
  }) => {
    const newPath = path ? `${path}.${key}` : key;
    switch (type) {
      case 'nested':
        return iter(children, newPath);
      case 'added':
        return `Property '${newPath}' was added with value: ${handler(value)}`;
      case 'deleted':
        return `Property '${newPath}' was removed`;
      case 'updated':
        return `Property '${newPath}' was updated. From ${handler(value1)} to ${handler(value2)}`;
      default:
    }
    return null;
  });

  return lines.filter(Boolean);
};

const plain = (arrayWithState) => iter(arrayWithState).join('\n');

export default plain;
