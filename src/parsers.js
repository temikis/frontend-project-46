import yaml from 'js-yaml';

const parsers = (data, extname) => {
  let obj;

  switch (extname) {
    case '.json':
      obj = JSON.parse(data);
      break;
    case '.yml':
    case '.yaml':
      obj = yaml.load(data);
      break;
    default:
      throw new Error(`Unknown file extension: '${extname}'!`);
  }

  return obj;
};

export default parsers;
