const awilix = require('awilix');
const path = require('path');

class IoC {
  constructor() {
    this.container = awilix.createContainer();
  }

  loadModules(glob, opts) {
    this.container.loadModules(glob, Object.assign({
      formatName: 'camelCase',
      injectionMode: awilix.InjectionMode.PROXY,
      cwd: path.resolve(__dirname, ''),
    }, opts));
    return this.container;
  }

  register(obj) {
    this.container.register(obj);
  }
}

module.exports = IoC;
