import yaml from 'js-yaml';
import CustomError from './CustomError.js';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

export default (data, ext) => {
  if (!parsers[ext]) {
    throw new CustomError(`Unsupported format ${ext}`);
  }
  const parser = parsers[ext];
  return parser(data);
};
