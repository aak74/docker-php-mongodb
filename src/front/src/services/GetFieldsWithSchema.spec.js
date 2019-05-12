import getFields from './GetFieldsWithSchema';

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
  const SCHEMA = [
    {
      model: 'name',
      label: 'Name',
    }, {
      model: 'url',
      label: 'Url',
    },
  ];
  const result = getFields(SCHEMA, { name: 'My name' });
  expect(result).toMatchObject([
    {
      value: 'My name',
      model: 'name',
      label: 'Name',
    }, {
      value: undefined,
      model: 'url',
      label: 'Url',
    },
  ]);
});

test('Mix groupped data with schema', () => {
  const SCHEMA = [
    {
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
  ];

  const result = getFields(SCHEMA, { host: 'hostname' });
  expect(result).toMatchObject([{
    model: 'ssh',
    label: 'SSH',
    type: 'group',
    value: undefined,
    fields: [
      {
        value: 'hostname',
        model: 'host',
        label: 'Host',
      }, {
        value: undefined,
        model: 'port',
        label: 'Port',
      },
    ],
  }]);
});
