import Model from './Model';
import schema from './schemas/ProjectSchema';

class Project extends Model {
  constructor({ client }) {
    super({
      client,
      baseUrl: 'projects',
      schema,
    });
  }

  backup(id) {
    this.client.post(`${this.baseUrl}/${id}/backup`, { data: id });
  }
}

export default Project;
