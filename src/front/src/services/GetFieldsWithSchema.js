/**
 * Return injected data into schema
 * @param {Array} schema
 * @param {Oject} data
 */
function getFieldsWithSchema(schema, data) {
  if (!schema) {
    throw new Error('Bad parameters');
  }
  if (!Array.isArray(schema)) {
    throw new Error('Parameter schema must be an array');
  }
  // console.log(1, schema, data);

  const result = schema.reduce((carry, item) => {
    const value = (data && data[item.model])
      ? data[item.model]
      : undefined;

    // console.log(2, item, value);
    if (item.fields) {
      item.fields = getFieldsWithSchema(item.fields, value);
      carry.push(Object.assign({}, item, { value: undefined }));
    } else {
      carry.push(Object.assign({}, item, { value }));
    }
    return carry;
  }, []);
  return result;
}

export default getFieldsWithSchema;
