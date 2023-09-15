import stylish from './stylish.js';

const formatters = (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  return '';
};

export default formatters;
