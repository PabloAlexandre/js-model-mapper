const initObject = require('./initObject');

describe('Testing initObject function', () => {
  it('Should init a new object from path', () => {
    const initialValue = 'Sample';
    const expectedOutput = { test: initialValue };

    expect(initObject('test', initialValue)).toEqual(expectedOutput);
  });

  it('Should init a new nested object from path', () => {
    const initialValue = 'Sample';
    const expectedOutput = { test: { nested: initialValue } };

    expect(initObject('test.nested', initialValue)).toEqual(expectedOutput);
  });

  it('Should return an empty object when path isn\'t provided', () => {
    const expectedOutput = { };
    expect(initObject()).toEqual(expectedOutput);
  });
});
