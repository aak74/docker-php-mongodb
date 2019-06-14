function getKeyAndName(name) {
  let key = name;
  if (typeof name === 'object') {
    [key] = Object.keys(name);
    // eslint-disable-next-line no-param-reassign
    name = name[key];
  }
  return { key, name };
}

class BaseController {
  constructor(injector) {
    this.injector = injector;
    this.commands = [];
    this.queries = [];
  }

  registerCommands(commands) {
    commands.forEach(commandName => {
      this.registerCommand(commandName);
    });
  }

  registerQueries(queries) {
    queries.forEach(queryName => {
      this.registerQuery(queryName);
    });
  }

  registerCommand(commandName) {
    const { key, name } = getKeyAndName(commandName);
    if (!this.injector[name]) {
      throw new Error(`Command ${name} doesn't exists`);
    }
    const command = this.injector[name];
    if (!command.execute || typeof command.execute !== 'function') {
      throw new Error(`Command ${name} doesn't have an execute method`);
    }
    this.commands[key] = command;
  }

  registerQuery(queryName) {
    const { key, name } = getKeyAndName(queryName);
    if (!this.injector[name]) {
      throw new Error(`Query ${name} doesn't exists`);
    }
    const query = this.injector[name];
    if (!query.get || typeof query.get !== 'function') {
      throw new Error(`Query ${name} doesn't have a get method`);
    }
    this.queries[key] = query;
  }

  get(queryName, params) {
    if (!this.queries[queryName] || typeof this.queries[queryName].get !== 'function') {
      throw new Error(`Query ${queryName} doesn't registered`);
    }
    return this.queries[queryName].get(params);
  }

  execute(commandName, params) {
    if (!this.commands[commandName] || typeof this.commands[commandName].execute !== 'function') {
      throw new Error(`Command ${commandName} doesn't registered`);
    }
    return this.commands[commandName].execute(params);
  }
}

module.exports = BaseController;
