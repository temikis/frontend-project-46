import _ from 'lodash';

const handler = (rawValue) => {
  if (_.isObject(rawValue)) {
    return '[complex value]';
  }
  return (typeof rawValue === 'string') ? `'${rawValue}'` : rawValue;
};

const plain = (arrayWithState) => {
  const emptyPath = '';

  const iter = (currentValue, path) => {
    const lines = currentValue.reduce((acc, element) => {
      const { state, key, value } = element;
      const newPath = path ? `${path}.${key}` : key;
      switch (state) {
        case 'compare':
          acc.push(iter(value, newPath));
          break;
        case 'added':
          acc.push(`Property '${newPath}' was added with value: ${handler(value)}`);
          break;
        case 'deleted':
          acc.push(`Property '${newPath}' was removed`);
          break;
        case 'updated':
          acc.push(`Property '${newPath}' was updated. From ${handler(value[0])} to ${handler(value[1])}`);
          break;
        default:
      }
      return acc;
    }, []);

    return lines.flat();
  };

  return iter(arrayWithState, emptyPath).join('\n');
};

export default plain;
