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
    if (!this.injector[commandName]) {
      throw new Error(`Command ${commandName} doesn't exists`);
    }
    const command = this.injector[commandName];
    if (!command.execute || typeof command.execute !== 'function') {
      throw new Error(`Command ${commandName} doesn't have an execute method`);
    }
    this.commands[commandName] = command;
  }

  registerQuery(queryName) {
    if (!this.injector[queryName]) {
      throw new Error(`Query ${queryName} doesn't exists`);
    }
    const query = this.injector[queryName];
    if (!query.get || typeof query.get !== 'function') {
      throw new Error(`Query ${queryName} doesn't have a get method`);
    }
    this.queries[queryName] = query;
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
