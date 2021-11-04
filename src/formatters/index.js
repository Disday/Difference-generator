import stylish from './stylish.js';

export default (data, format) => {
  const formatters = {
    stylish,
  };
  const formatter = formatters[format];
  return formatter(data);
};
