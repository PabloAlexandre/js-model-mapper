const mapper = require('./mapper');

describe('Testing mapper behavior', () => {
  it('Should return only existent values from object', () => {
    const mapperValues = ['title', 'author', 'createdAt'];
    const payload = { title: 'MyTitle', author: 'MyAuthor' };

    expect(mapper(mapperValues)(payload)).toStrictEqual(payload);
  });

  it('Should return nested values from object', () => {
    const mapperValues = ['title', 'author.name'];
    const payload = { title: 'MyTitle', author: { name: 'MyAuthor' } };

    expect(mapper(mapperValues)(payload)).toStrictEqual(payload);
  });

  it('Should return same name when my mapper value is a object only with name property', () => {
    const mapperValues = [{ name: 'title' }];
    const payload = { title: 'MyTitle' };

    expect(mapper(mapperValues)(payload)).toStrictEqual(payload);
  });

  it('Should return nothing when name property don\'t exists in payload', () => {
    const mapperValues = [{ name: 'title' }];
    const payload = { name: 'MyTitle' };
    expect(mapper(mapperValues)(payload)).toStrictEqual({});
  });

  it('Should return a renamed property when my mapper value has from property', () => {
    const mapperValues = [{ name: 'title', from: 'name' }];
    const payload = { name: 'MyTitle' };
    const expectedValue = { title: payload.name };

    expect(mapper(mapperValues)(payload)).toStrictEqual(expectedValue);
  });

  it('Should return a transformed property when my mapper value has transform property', () => {
    const mapperValues = [{ name: 'title', transform: title => title.toUpperCase() }];
    const payload = { title: 'MyTitle' };
    const expectedValue = { title: payload.title.toUpperCase() };

    expect(mapper(mapperValues)(payload)).toStrictEqual(expectedValue);
  });

  it('Should received as args in transform options all payloads and return a concat value', () => {
    const mapperValues = [{ name: 'title', transform: (title, fullPayload) => `${title}${fullPayload.name}` }];
    const payload = { title: 'MyTitle', name: 'Sample' };
    const expectedValue = { title: `${payload.title}${payload.name}` };

    expect(mapper(mapperValues)(payload)).toStrictEqual(expectedValue);
  });

  it('Should not appy transform function when mapper key doesn\'t exists', () => {
    const mapperValues = [{ name: 'nonExistent', transform: jest.fn() }];
    const payload = { title: 'MyTitle' };

    expect(mapper(mapperValues)(payload)).toStrictEqual({});
    expect(mapperValues[0].transform).not.toBeCalled();
  });

  it('Should apply a field when shouldApplyCondition is valid', () => {
    const mapperValues = [{
      name: 'message',
      shouldApply: {
        field: 'country',
        condition: country => country === 'Brazil',
      },
    }];
    const payload = { country: 'Brazil', message: 'this content is available in your country' };

    expect(mapper(mapperValues)(payload)).toStrictEqual({ message: payload.message });
  });

  it('Should not apply a field when condition of shouldApply isn\'t valid', () => {
    const mapperValues = [{
      name: 'message',
      shouldApply: {
        condition: country => country !== 'Brazil',
      },
    }];
    const payload = { country: 'Brazil', message: 'this content is available in your country' };

    expect(mapper(mapperValues)(payload)).toStrictEqual({ });
  });

  it('Should not apply a field when field of shouldApply isn\'t provided', () => {
    const mapperValues = [{
      name: 'message',
      shouldApply: {
        condition: country => country === 'Brazil',
      },
    }];
    const payload = { country: 'Brazil', message: 'this content is available in your country' };

    expect(mapper(mapperValues)(payload)).toStrictEqual({ });
  });

  it('Should ignore non valid item type in mapperOptions', () => {
    const mapperValues = ['title', null, 'author', 3];
    const payload = { title: 'MyTitle', author: 'MyAuthor' };

    expect(mapper(mapperValues)(payload)).toStrictEqual(payload);
  });
});
