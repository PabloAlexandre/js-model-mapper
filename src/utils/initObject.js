module.exports = function initObject(path = '', initialValue) {
  return !path || !path.split ? {} : path
    .split('.')
    .reverse()
    .reduce((acc, key) => ({ [key]: acc }), initialValue);
};
