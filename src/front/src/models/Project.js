import Model from './Model';

class Project extends Model {
  constructor({ loader }) {
    super({ loader, baseUrl: 'projects' });
  }

  backup(id) {
    this.loader.post(`${this.baseUrl}/${id}/backup`, { data: id });
  }
}

export default Project;
