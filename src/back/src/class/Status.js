'use strict';

const axios = require('axios');
const Db = require('./Db');
const db = Db.connect();
const projects = require('../models/Projects');
const {EventEmitter} = require('events');

class StatusUpdater extends EventEmitter {
  constructor(project) {
    super();

    this.id = project._id;
    this.name = project.name;
    this.url = project.url;
    this.status = project.status;
    this.updateTime = null;
  }

  async updateStatus() {
    console.log('status before:', this.url);
    axios.get('https://google.com')
      .then(response => {
        projects.find({ _id: this.id }).updateOne({ status: response.status }).exec();
        console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });
    }
}

const projectToUpdate = new StatusUpdater({
    _id:"5bc9b9ee3cfa8f6b8a975d19",
    name:"VR",
    url:"vr.com",
    status:"300 OK"
});

projectToUpdate.updateStatus();

module.exports = StatusUpdater;