import _ from 'lodash';

const getPath = (path, key) => (path ? `${path}.${key}` : key);

const stringify = (rawValue) => {
  if (_.isObject(rawValue)) return '[complex value]';
  if (typeof rawValue === 'string') return `'${rawValue}'`;

  return String(rawValue);
};

const iter = (currentValue, path = '') => {
  const lines = currentValue.flatMap((element) => {
    const { type, key } = element;
    const newPath = getPath(path, key);
    switch (type) {
      case 'nested':
        return iter(element.children, newPath);
      case 'added':
        return `Property '${newPath}' was added with value: ${stringify(element.value)}`;
      case 'deleted':
        return `Property '${newPath}' was removed`;
      case 'updated':
        return `Property '${newPath}' was updated. From ${stringify(element.value1)} to ${stringify(element.value2)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.filter(Boolean);
};

const format = (arrayWithState) => iter(arrayWithState).join('\n');

export default format;
