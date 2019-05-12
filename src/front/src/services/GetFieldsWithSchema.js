/**
 * Return merged schema with data
 * @param {Array} schema
 * @param {Oject} data
 */
function getFieldsWithSchema(schema, data) {
  if (!schema || !data) {
    throw new Error('Bad parameters');
  }
  if (!schema.reduce) {
    throw new Error('Parameter schema must be an array');
  }

  // console.log(data);

  const result = schema.reduce((carry, item) => {
    console.log(item, data[item.model]);
    carry.push({
      value: data[item.model],
      attrs: Object.assign({}, item),
    });
    return carry;
  }, []);
  return result;
}

export default getFieldsWithSchema;
