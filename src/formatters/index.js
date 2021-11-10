import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format) => {
  const formatters = {
    stylish,
    plain,
  };
  const formatter = formatters[format];
  return formatter(data);
};
