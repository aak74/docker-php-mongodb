const { EventEmitter } = require('events');

class QueueProxy extends EventEmitter {
  constructor ({ logger }) {
    super();

    this.logger = logger;
    this.tasks = [];
  }

  subscribe(queue) {
    queue.on('channel_created', () => {
      this.push();
    });
  }

  async connect () {
    await this.db.connect();
  }

  async publish (msg, queueName) {
    this.tasks.push({
      msg,
      queueName
    });
    setTimeout(async (msg, queueName) => {
      this.logger.debug(`#QUEUE_PROXY# QueueProxy.publish attempt`);
      await this.publish(msg, queueName);
    }, 5000);
  }

  async push () {
    try {
      const idToRemove = [];
      const taskForPublish = [];
      this.tasks.forEach((task) => {
        taskForPublish.push({msg: task.msg, queueName: task.queueName});
        idToRemove.push(task._id);
      });
      if (idToRemove && idToRemove.length > 0) {
        await this.db.get().collection('rabbitMQ').remove({_id: {$in: idToRemove}});
      }
      taskForPublish.forEach((task) => {
        this.queue.publish(task.msg, task.queueName)
      })
    } catch (err) {
      setTimeout(async () => {
        this.logger.debug(`#QUEUE_PROXY# QueueProxy.push attempt`);
        await this.push();
      }, 5000);
      this.logger.error(`#QUEUE_PROXY# QueueProxy.push err ${err.message}`);
    }
  }
}

module.exports = QueueProxy;
