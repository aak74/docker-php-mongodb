'use strict';

const { EventEmitter } = require('events');

class UpdateStatuses extends EventEmitter {
  constructor({
    logger,
    getProjects,
    getPage,
    updateStatus
  }) {
    super();

    this.logger = logger;
    this.getProjects = getProjects;
    this.updateStatus = updateStatus;
    this.getPage = getPage;
    this.queue = new Map;
    this.timers = new Map;
    // this.minPause = 10000;
    this.minPause = 60;
  }

  execute() {
    this.on('itemPushed', (projectId) => {
      if (this.timers.has(projectId)) {
        return;
      }
      const timerId = setTimeout(async () => {
        try {
          const project = this.queue.get(projectId)
          let result = await this.getPage.get(project.url);
          // let result = project;
          this.logger.info(project.url, result);
          result = Object.assign(project, result)
          // this.logger.info(`${project.url} | status=${result.status} | time=${result.time} | contentLength=${result.contentLength}`);
          this.timers.delete(projectId)
          this.update(result);
        } catch (error) {
          console.log('err', error);
          
          this.logger.error('err', error);
        }
      }, this.queue.get(projectId).toExec - Date.now());
      this.timers.set(projectId, timerId);
    });
    this.putProjectsToQueue();
  }
  
  update(project) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    // const pause = getRandomInt(1, 6) * 1000;
    const pause = this.minPause * 1000;
    // const pause = getRandomInt(this.minPause, this.minPause * 2) * 1000;
    project.toExec = Date.now() + pause;
    this.logger.debug(`-------------------------------- next ----> | count=${project.count} | pause=${pause / 1000}s | ${project.url}`);
    this.updateStatus.execute(project);
    this.putProjectToQueue(project);
  }

  async putProjectToQueue(project) {
    project.count = project.count ? project.count + 1 : 1;
    this.logger.debug(`putProjectToQueue 1 ${project._id}`, project.count);
    this.queue.set(project._id, project);
    this.emit('itemPushed', project._id);
  }
  
  async putProjectsToQueue() {
    const projects = await this.getProjects.get({}, {
      _id: 1,
      url: 1
    });
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      project.toExec = Date.now();
      project.count = 0;
      this.putProjectToQueue(project);
    }
  }
}

module.exports = UpdateStatuses;
