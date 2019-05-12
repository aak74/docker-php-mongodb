/**
 * Return injected data into schema
 * @param {Array} schema
 * @param {Oject} data
 */
function getFieldsWithSchema(schema, data) {
  if (!schema || !data) {
    throw new Error('Bad parameters');
  }
  if (!Array.isArray(schema)) {
    throw new Error('Parameter schema must be an array');
  }
  // console.log(schema, data);

  const result = schema.reduce((carry, item) => {
    // console.log(item, data[item.model]);
    if (item.fields) {
      item.fields = getFieldsWithSchema(item.fields, data);
    }
    carry.push(Object.assign({}, item, { value: data[item.model] }));
    return carry;
  }, []);
  return result;
}

export default getFieldsWithSchema;
