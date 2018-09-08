module.exports = function get(obj, path = '', defaultValue) {
  if (!obj || !path || !path.split) return undefined;

  const result = path
    .split('.')
    .reduce((acc, pathKey) => acc && acc[pathKey], obj);

  return result !== undefined ? result : defaultValue;
};
