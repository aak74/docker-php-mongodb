'use strict';

class BaseController {
  constructor() {
    this.commands = [];
    this.queries = [];
  }

  registerCommands(commands) {
    for (const commandName in commands) {
      if (commands.hasOwnProperty(commandName)) {
        this.registerCommand(commandName, commands[commandName]);
      }
    }
  }

  registerQueries(queries) {
    for (const queryName in queries) {
      if (queries.hasOwnProperty(queryName)) {
        this.registerQuery(queryName, queries[queryName]);
      }
    }
  }

  registerCommand(commandName, command) {
    this.commands[commandName] = command;
  }

  registerQuery(queryName, query) {
    this.queries[queryName] = query;
  }

  async get(queryName, params) {
    // console.log('get', queryName, params, this.queries[queryName]);
    return await this.queries[queryName].get(params);
  }

  async execute(commandName, params) {
    // console.log('get', commandName, params, this.queries[commandName]);
    return await this.commands[commandName].execute(params);
  }

}

module.exports = BaseController;
