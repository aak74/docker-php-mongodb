class Model {
  constructor({ loader, baseUrl }) {
    this.loader = loader;
    this.baseUrl = baseUrl;
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
}

export default Model;
