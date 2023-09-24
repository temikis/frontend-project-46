import yaml from 'js-yaml';

const parsers = (data, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extension: '${extname}'!`);
  }
};

export default parsers;
