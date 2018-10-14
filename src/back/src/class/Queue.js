const amqp = require('amqplib');
const {EventEmitter} = require('events');

const config = require('../config');

class Queue extends EventEmitter {
  constructor(log, queueName, isListen = false) {
    super();

    this.connection = null;
    this.channel = null;
    this.lastResult = null;
    this.queueName = queueName;
    this.isListen = isListen;

    this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
    this.log = log;
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
      this.error('connect', err.toString());
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
      this.error('assert', err.toString());
    }
  }

  error(type, err) {
    this.log.error(`#RABBIT# ${type} error %j`, err.toString());
  }

  async ack(msg) {
    try {
      await this.channel.ack(msg);
    } catch (err) {
      this.error('ack', err.toString());
    }
  }

  async subscribeOnQueues() {
    try {
      await this.assertQueue(this.queueName);
      await this.channel.consume(this.queueName, async (msg) => {
        this.emitConsume(msg);
      }, {noAck: false});
    } catch (err) {
      this.error('subscribe', err.toString());
    }
  }

  emitConsume(msg) {
    this.emit(`consume`, msg);
  }

  getLastResult() {
    return this.lastResult;
  }

  async publish(msg, queue = null) {
    try {
      if (!this.connection) {
        await this.connect(this.url);
      }
      if (!this.channel) {
        await this.createConfirmChannel();
      }

      const message = JSON.stringify(msg);
      await this.assertQueue(queue || this.queueName);
      this.lastResult = await this.channel.sendToQueue(queue || this.queueName, Buffer.from(message), {
        persistent: true,
      });
      this.emit('publish', this.getLastResult());
      if (this.queueName !== 'log') {
        this.log.debug(`#RABBIT# Sent to ${this.queueName} %j`, message);
      }
    } catch (err) {
      this.error('publish', err.toString());
    }
  }
}

module.exports = Queue;
