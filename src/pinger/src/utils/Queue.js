const amqp = require('amqplib');
const { EventEmitter } = require('events');


class QueueBroker extends EventEmitter {
  constructor({ logger, queueProxy, config }) {
    super();

    this.connection = null;
    this.channel = null;
    this.lastResult = null;
    this.queuesForSubscribe = [];
    this.channelCreatedEventBinded = false;

    this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
    // this.url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`;

    this.logger = logger;
    this.config = config;
    this.queueProxy = queueProxy;
    this.queueProxy.subscribe(this);
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this.url);
      this.connection.on('error', (err) => {
        this.error(`connection lost`, err);
        this.channel = null;
        this.connection = null;
        setTimeout(() => {
          this.logger.info(`reconnect after error`);
          this.connect();
        }, 5000);
      });
      this.logger.info(`#RABBIT# connected`);
      this.emit('connected', this.connection);
      await this.createConfirmChannel();
    } catch (err) {
      this.emit('connection_error');
      this.error(`connection`, err);
      this.channel = null;
      this.connection = null;
      setTimeout(() => {
        this.logger.info(`#RABBIT# reconnect attempt`);
        this.connect();
      }, 5000);
    }
  }

  async assertQueue(queueName) {
    try {
      await this.channel.assertQueue(queueName, Object.assign({}, {
        durable: true,
      }, this.config.queues[queueName] || {}));
    } catch (err) {
      this.error(`assert ${err.message}`);
    }
  }

  async createConfirmChannel() {
    if (!this.connection) {
      return;
    }
    this.channel = await this.connection.createConfirmChannel();
    await this.channel.prefetch(1);
    this.logger.info(`#RABBIT# channel_created`);
    this.emit('channel_created', this.channel);
  }

  error(type, err) {
    this.logger.error(`#RABBIT# ${type} error ${err && err.message || ''}`);
  }

  subscribe (queueName) {
    console.log('Подписался на ', queueName)
    if (!this.channel) {
      this.queuesForSubscribe.push(queueName);

      if (!this.channelCreatedEventBinded) {
        this.channelCreatedEventBinded = true;

        this.on('channel_created', () => {
          this.subscribeOnQueues();
        });
      }
    } else {
      this.subscribeOnQueue(queueName);
    }
  }

  async subscribeOnQueue(queueName) {
    try {
      await this.assertQueue(queueName);
      await this.channel.consume(queueName, async (msg) => {
        if (!msg || !msg.content || !msg.content.toString()) {
          this.logger.error('Empty message');
          this.emit(queueName, msg);
          return;
        }
        this.emit(queueName, JSON.parse(msg.content.toString()));

      }, {noAck: true});
    } catch (err) {
      this.logger.error(`subscribe on ${queueName} error ${err.message}`);
    }
  }

  async subscribeOnQueues () {
    for(let i in this.queuesForSubscribe) {
      const queueName = this.queuesForSubscribe[i];

      this.subscribeOnQueue(queueName);
    }
  }

  getLastResult() {
    return this.lastResult;
  }

  async publish(msg, queueName) {
    try {
      const message = JSON.stringify(msg);
      if (!this.connection || !this.channel) {
        this.queueProxy.publish(msg, queueName);
        return;
      }
      await this.assertQueue(queueName);
      this.lastResult = await this.channel.sendToQueue(queueName, Buffer.from(message), {
        persistent: true,
      });
      this.emit('publish', this.getLastResult());
      if (queueName !== 'log') {
        this.logger.debug(`#RABBIT# Sent to ${queueName} %j`, message);
      }
    } catch (err) {
      console.log('publish error', err);
      this.error(`publish error ${err.message}`);
    }
  }
}

module.exports = QueueBroker;
