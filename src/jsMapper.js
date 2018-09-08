const { get, initObject } = require('./utils');

const getNewObjectFromPath = (value, newKey) => (value
  ? initObject(newKey, value)
  : {});

const getTransformedObject = (
  transformFn, value, key, originalPayload,
) => initObject(key, transformFn(value, originalPayload));

const handleObjectMapperOption = (obj, mapperOption) => {
  const path = mapperOption.from || mapperOption.name;
  const newKey = mapperOption.name;
  const value = get(obj, path);

  if (value === undefined) {
    return {};
  }

  if (mapperOption.shouldApply) {
    const { condition, field } = mapperOption.shouldApply;
    const conditionValue = get(obj, field);
    if (conditionValue === undefined || !condition(conditionValue, obj)) return {};
  }

  if (mapperOption.transform) {
    return getTransformedObject(mapperOption.transform, value, newKey, obj);
  }

  return getNewObjectFromPath(value, newKey);
};


module.exports = function mapper(mapperOptions) {
  return mapperObject => mapperOptions.reduce((mappedOutput, mapperOption) => {
    if (!mapperOption) return mappedOutput;

    switch (typeof mapperOption) {
      case 'object':
        return Object.assign(mappedOutput, handleObjectMapperOption(mapperObject, mapperOption));
      case 'string':
        return Object.assign(mappedOutput,
          getNewObjectFromPath(get(mapperObject, mapperOption), mapperOption));
      default:
        return mappedOutput;
    }
  }, {});
};
