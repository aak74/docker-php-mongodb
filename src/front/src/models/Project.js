import Model from './Model';
import schema from './schemas/ProjectSchema';

class Project extends Model {
  constructor({ loader }) {
    super({
      loader,
      baseUrl: 'projects',
      schema,
    });
  }

  backup(id) {
    this.loader.post(`${this.baseUrl}/${id}/backup`, { data: id });
  }
}

export default Project;
