const { EventEmitter } = require('events');

class UpdateStatuses extends EventEmitter {
  constructor(injector) {
    super();

    this.logger = injector.logger;
    this.getProjectsQuery = injector.getProjects;
    this.updateStatusCommand = injector.updateStatus;
    this.getPage = injector.getPage;
    this.pingAfter = injector.config.pingAfter;
    this.queue = new Map();
    this.timers = new Map();
  }

  async execute() {
    this.on('itemPushed', projectId => {
      if (this.timers.has(projectId)) {
        return;
      }
      const executeAfter = this.queue.get(projectId).toExec - Date.now();
      const timerId = setTimeout(async () => {
        try {
          await this.updateStatus(projectId);
        } catch (error) {
          console.log('err', error);
          // this.logger.error('err', error);
        }
      }, executeAfter);
      this.timers.set(projectId, timerId);
    });
    const projects = await this.getProjects();
    this.putProjectsToQueue(projects);
  }

  async updateStatus(projectId) {
    const project = this.queue.get(projectId);
    const result = await this.getPage.get(project.url);
    this.timers.delete(project._id);
    // this.executeUpdateStatus(project);
    this.updateStatusCommand.execute(Object.assign(project, result));
    this.update(project);
  }

  executeUpdateStatus(project) {
    this.updateStatusCommand.execute(project);
  }

  executeGetPage(projectUrl) {
    return this.getPage.get(projectUrl);
  }

  update(project) {
    project.toExec = Date.now() + this.pingAfter * 1000;
    this.putProjectToQueue(project);
  }

  async putProjectToQueue(project) {
    if (project.count === undefined) {
      project.count = 0;
      project.toExec = Date.now();
    } else {
      project.count += 1;
    }
    this.queue.set(project._id, project);
    this.emit('itemPushed', project._id);
  }

  async putProjectsToQueue(projects) {
    projects.forEach(project => {
      this.putProjectToQueue(project);
    });
  }

  getProjects() {
    return this.getProjectsQuery.get({}, {
      _id: 1,
      url: 1,
    });
  }
}

module.exports = UpdateStatuses;
