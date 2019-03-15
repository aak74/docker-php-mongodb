const amqp = require('amqplib');
const {EventEmitter} = require('events');

const config = require('../config');

class Queue extends EventEmitter {
  constructor({ logger }) {
    super();

    this.connection = null;
    this.channel = null;
    this.lastResult = null;
    // this.queueName = queueName;
    this.isListen = false;

    this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`;
    this.logger = logger;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this.url);
      this.emit('connected', this.connection);
      await this.createConfirmChannel();
      if (this.isListen) {
        await this.subscribeOnQueues();
      }
    } catch (err) {
      this.error(this.url, err);
    }
  }

  async createConfirmChannel() {
    this.channel = await this.connection.createConfirmChannel();
    await this.channel.prefetch(1);
    this.emit('channel_created', this.channel);
  }

  async assertQueue(queueName) {
    try {
      await this.channel.assertQueue(queueName, Object.assign({}, {
        durable: true,
      }, config.rabbit.queues[queueName] || {}));
    } catch (err) {
      this.error('assert', err);
    }
  }

  error(type, err) {
    console.log('err', err);
    // console.log('err', err.stack());
    
    this.logger.error(`#RABBIT# ${type} error %j`, err.toString());
  }

  async ack(msg) {
    try {
      await this.channel.ack(msg);
    } catch (err) {
      this.error('ack', err.toString());
    }
  }

  async subscribeOnQueues(queueName) {
    try {
      await this.assertQueue(queueName);
      await this.channel.consume(queueName, async (msg) => {
        this.emitConsume(msg);
      }, {noAck: false});
    } catch (err) {
      this.error('subscribe', err);
    }
  }

  emitConsume(msg) {
    this.emit(`consume`, msg);
  }

  getLastResult() {
    return this.lastResult;
  }
  

  async publish(msg, queue) {
    try {
      if (!this.connection) {
        await this.connect(this.url);
      }
      if (!this.channel) {
        await this.createConfirmChannel();
      }

      const message = JSON.stringify(msg);
      await this.assertQueue(queue);
      this.lastResult = await this.channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
      });
      this.emit('publish', this.getLastResult());
      if (queue !== 'log') {
        this.logger.debug(`#RABBIT# Sent to ${queue} %j`, message);
      }
    } catch (err) {
      this.error('publish', err);
    }
  }
}

module.exports = Queue;
