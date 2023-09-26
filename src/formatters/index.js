import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'json':
      return json(data);
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format type - ${formatName}`);
  }
};

export default format;
