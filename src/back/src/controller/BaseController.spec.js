const BaseController = require('./BaseController');

const getQuery = x => ({
  id: x,
  get(param) {
    return param * x;
  },
});

const getCommand = x => ({
  id: x,
  execute(param) {
    return param + x;
  },
});

let ctrl;
const injector = {
  getPlusOne: getQuery(1),
  getPlusTwo: getQuery(2),
  increment: getCommand(1),
  badQuery: { get: 1 },
  badCommand: { execute: 1 },
};

beforeEach(() => {
  ctrl = new BaseController(injector);
});

test('Should register queries', () => {
  ctrl.registerQueries(['getPlusOne', 'getPlusTwo']);
  expect(ctrl.queries).toMatchObject({
    getPlusOne: { id: 1 },
    getPlusTwo: { id: 2 },
  });
});

test('Should throw error if query doesn`t exists', () => {
  const t = () => {
    ctrl.registerQueries(['getPlusOne', 'getTwo', 'getPlusTwo']);
  };
  expect(t).toThrowError();
});

test('Should throw error if query doesn`t have a get method', () => {
  const t = () => {
    ctrl.registerQuery('badQuery');
  };
  expect(t).toThrowError('Query badQuery doesn\'t have a get method');
});

test('Should throw error if call get method on unregistered query', () => {
  const t = () => {
    ctrl.get('badQuery');
  };
  expect(t).toThrowError('Query badQuery doesn\'t registered');
});

test('Should throw error if command doesn`t have an execute method', () => {
  const t = () => {
    ctrl.registerCommand('badCommand');
  };
  expect(t).toThrowError('Command badCommand doesn\'t have an execute method');
});

test('Should throw error if call execute method on unregistered command', () => {
  const t = () => {
    ctrl.execute('badCommand');
  };
  expect(t).toThrowError('Command badCommand doesn\'t registered');
});

test('Should call get method of registered query', () => {
  ctrl.registerQueries(['getPlusOne', 'getPlusTwo']);
  expect(ctrl.get('getPlusOne', 10)).toEqual(10);
  expect(ctrl.get('getPlusTwo', 10)).toEqual(20);
});

test('Should call execute method of registered command', () => {
  ctrl.registerCommand('increment');
  expect(ctrl.execute('increment', 100)).toEqual(101);
});
