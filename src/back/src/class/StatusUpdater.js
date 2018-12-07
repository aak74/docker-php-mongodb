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
    this.url = 'https://' + project.url;
    this.status = project.status;
    this.updateTime = null;
  }

  async updateStatus() {
    console.log('status before:', this.url);
    const start = Date.now();
    axios.get(this.url)
      .then(response => {
        console.log('response', this.url, response.headers['content-length'], Date.now() - start);
        if (this.url === 'https://ya.ru') {
          // console.log('response', this.url, response);
        }
        projects.find({ _id: this.id }).updateOne({ status: { code: response.status, text: response.statusText } }).exec();
        console.log(response.status);
      })
      .catch(error => {
        projects.find({ _id: this.id }).updateOne({ status: { code: error.code } }).exec();
      });
    }
}

module.exports = StatusUpdater;
