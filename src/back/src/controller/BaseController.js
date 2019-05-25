class BaseController {
  constructor() {
    this.commands = [];
    this.queries = [];
  }

  registerCommands(commands) {
    const keys = Object.keys(commands);
    for (let i = 0; i < keys.length; i += 1) {
      this.registerCommand(keys[i], commands[keys[i]]);
    }
  }

  registerQueries(queries) {
    const keys = Object.keys(queries);
    for (let i = 0; i < keys.length; i += 1) {
      this.registerQuery(keys[i], queries[keys[i]]);
    }
  }

  registerCommand(commandName, command) {
    this.commands[commandName] = command;
  }

  registerQuery(queryName, query) {
    this.queries[queryName] = query;
  }

  get(queryName, params) {
    // console.log('get', queryName, params, this.queries[queryName]);
    return this.queries[queryName].get(params);
  }

  execute(commandName, params) {
    // console.log('get', commandName, params, this.queries[commandName]);
    return this.commands[commandName].execute(params);
  }
}

module.exports = BaseController;
