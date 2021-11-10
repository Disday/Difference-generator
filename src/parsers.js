import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

export default (data, ext) => {
  if (!parsers[ext]) {
    throw new Error(`Unsupported format ${ext}`);
  }
  const parser = parsers[ext];
  return parser(data);
};
