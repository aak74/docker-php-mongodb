'use strict';

const { EventEmitter } = require('events');

class UpdateStatues extends EventEmitter {
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
    this.queue = [];
  }

  execute() {
    this.on('itemPushed', (project) => {
      setTimeout(async () => {
        try {
          let result = await this.getPage.get(project.url);
          result = Object.assign(project, result)
          this.update(result);
        } catch (error) {
          console.log('err', error);
        }
      }, project.toExec - Date.now());
    });
    this.putProjectsToQueue();
  }
  
  update(project) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    // const pause = getRandomInt(1, 6) * 1000;
    const pause = getRandomInt(30, 60) * 1000;
    project.toExec = Date.now() + pause;
    console.log('--------------------------------', project.url, project.count, pause / 1000);
    this.updateStatus.execute(project);
    this.putProjectToQueue(project);
  }

  async putProjectToQueue(project) {
    project.count++;
    this.emit('itemPushed', project);
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

module.exports = UpdateStatues;
