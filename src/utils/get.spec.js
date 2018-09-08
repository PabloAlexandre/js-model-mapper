const get = require('./get');

describe('Testing Get Function', () => {
  const mockedObject = {
    stringValue: 'Sample',
    booleanValue: false,
    numberValue: 0,
    childObj: {
      nestedValue: 'AnotherValue',
    },
  };

  it('Should return correctly the string value', () => {
    expect(get(mockedObject, 'stringValue')).toEqual(mockedObject.stringValue);
  });

  it('Should return correctly the number value', () => {
    expect(get(mockedObject, 'numberValue')).toEqual(mockedObject.numberValue);
  });

  it('Should return correctly the boolean value', () => {
    expect(get(mockedObject, 'booleanValue')).toEqual(mockedObject.booleanValue);
  });

  it('Should return correctly the nested property', () => {
    expect(get(mockedObject, 'childObj.nestedValue')).toEqual(mockedObject.childObj.nestedValue);
  });

  it('Should return default value when path doesn\'t exists', () => {
    const defaultValue = 'MyDefaultValue';
    expect(get(mockedObject, 'myNonExistentValue', defaultValue)).toEqual(defaultValue);
  });

  it('Should not return default value when value is a falsy boolean', () => {
    const defaultValue = 'MyDefaultValue';
    expect(get(mockedObject, 'booleanValue', defaultValue)).toEqual(mockedObject.booleanValue);
  });

  it('Should not return default value when value is 0', () => {
    const defaultValue = 'MyDefaultValue';
    expect(get(mockedObject, 'numberValue', defaultValue)).toEqual(mockedObject.numberValue);
  });

  it('Should return undefined when a path searching for nested elements is invalid', () => {
    expect(get(mockedObject, 'myChildObject.unexistentNestedProperty')).toBeUndefined();
  });

  it('Should return undefined when no args has been sended', () => {
    expect(get()).toBeUndefined();
  });

  it('Should return undefined when first parameter is not an object', () => {
    expect(get(null)).toBeUndefined();
  });

  it('Should return undefined when second param is not a string', () => {
    expect(get(mockedObject, null)).toBeUndefined();
  });
});
