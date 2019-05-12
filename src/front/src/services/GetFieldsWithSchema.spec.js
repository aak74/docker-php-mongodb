import getFields from './GetFieldsWithSchema';

const ctx = {
  SCHEMA: [
    {
      model: 'name',
      label: 'Name',
    }, {
      model: 'url',
      label: 'Url',
    }, {
      model: 'ssh',
      label: 'SSH',
      type: 'group',
      fields: [
        {
          model: 'host',
          label: 'Host',
        },
        {
          model: 'port',
          label: 'Port',
        },
      ],
    },
  ],
};

test('Throw Error when call function without properly params', () => {
  expect(getFields).toThrowError(new Error('Bad parameters'));
});

test('Throw Error when call function with schema is not array', () => {
  function t() {
    getFields(1, []);
  }
  expect(t).toThrowError(new Error('Parameter schema must be an array'));
});

test('Mix data with schema', () => {
  const result = getFields(ctx.SCHEMA.slice(0, 2), { name: 'My name' });
  expect(result).toMatchObject([
    {
      value: 'My name',
      attrs: {
        model: 'name',
        label: 'Name',
      },
    }, {
      value: undefined,
      attrs: {
        model: 'url',
        label: 'Url',
      },
    },
  ]);
});
/*
test.only('Mix groupped data with schema', () => {
  const result = getFields(ctx.SCHEMA.slice(2, 1), { host: 'hostname' });
  expect(result).toMatchObject([
    {
      value: 'hostname',
      attrs: {
        model: 'host',
        label: 'Host',
      },
    }, {
      value: undefined,
      attrs: {
        model: 'port',
        label: 'Port',
      },
    },
  ]);
});
*/
