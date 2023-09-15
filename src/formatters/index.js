import stylish from './stylish.js';
import plain from './plain.js';

const formatters = (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  if (formatName === 'plain') {
    return plain(data);
  }
  return '';
};

export default formatters;
