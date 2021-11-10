import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format) => {
  const formatters = {
    stylish,
    plain,
    json: JSON.stringify,
  };
  const formatter = formatters[format];
  return formatter(data);
};
