class Model {
  constructor({ loader, baseUrl, schema }) {
    this.loader = loader;
    this.baseUrl = baseUrl;
    this.schema = schema;
  }

  getList() {
    return this.loader.get(this.baseUrl);
  }

  getOne(id) {
    return this.loader.get(`${this.baseUrl}/${id}`);
  }

  add(data) {
    return this.loader.post(`${this.baseUrl}`, { data });
  }

  save(data) {
    return this.loader.post(`${this.baseUrl}/${data.id}`, { data });
  }

  delete(id) {
    return this.loader.request('delete', `${this.baseUrl}/${id}`);
  }

  getSchema() {
    return this.schema;
  }
}

export default Model;
