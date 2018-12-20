'use strict';

class PublishMessage {
  constructor({ logger, queue }) {
    this.logger = logger;
    this.queue = queue;
  }

  async execute(params) {
    this.logger.debug('PublishMessage', params);
    this.queue.publish(params.msg, params.queue);
  }
}

module.exports = PublishMessage;
