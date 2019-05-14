class Model {
  constructor({ client, baseUrl, schema }) {
    this.client = client;
    this.baseUrl = baseUrl;
    this.schema = schema;
  }

  getList() {
    return this.client.get(this.baseUrl);
  }

  getOne(id) {
    return this.client.get(`${this.baseUrl}/${id}`);
  }

  add(data) {
    return this.client.post(`${this.baseUrl}`, { data });
  }

  save(data) {
    // eslint-disable-next-line no-underscore-dangle
    return this.client.post(`${this.baseUrl}/${data._id}`, { data });
  }

  delete(id) {
    return this.client.request('delete', `${this.baseUrl}/${id}`);
  }

  getSchema() {
    return this.schema;
  }
}

export default Model;
