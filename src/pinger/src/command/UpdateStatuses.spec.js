const UpdateStatuses = require('./UpdateStatuses');

function getProjectWithCount(project, count = 0) {
  return Object.assign({}, project, { count });
}

let updateStatuses;
let projects;
const pingAfter = 5;

beforeEach(() => {
  updateStatuses = new UpdateStatuses({ config: { pingAfter } });
  projects = [
    {
      _id: 1,
      name: 'Project1',
    },
    {
      _id: 2,
      name: 'Project2',
    },
  ];
});

test('Should put a project in queue', () => {
  const project = projects[0];
  updateStatuses.putProjectToQueue(project);
  expect(updateStatuses.queue.has(1)).toBeTruthy();
  expect(updateStatuses.queue.get(1)).toMatchObject(getProjectWithCount(project));
});

test('Should emit event itemPushed with projectId after put a project in queue', () => {
  let pushedProjectId;
  updateStatuses.on('itemPushed', projectId => {
    pushedProjectId = projectId;
  });
  const project = projects[0];
  updateStatuses.putProjectToQueue(project);
  expect(pushedProjectId).toBe(project._id);
});

test('Should put all projects in queue', () => {
  updateStatuses.putProjectsToQueue(projects);
  expect(updateStatuses.queue.size).toBe(projects.length);
  expect(updateStatuses.queue.get(1)).toMatchObject(getProjectWithCount(projects[0]));
  expect(updateStatuses.queue.get(2)).toMatchObject(getProjectWithCount(projects[1]));
});

test('Should update a project in queue and count must be increased', () => {
  const project = projects[0];
  updateStatuses.putProjectToQueue(project);
  updateStatuses.update(project);
  expect(updateStatuses.queue.has(1)).toBeTruthy();
  expect(updateStatuses.queue.get(1)).toMatchObject(getProjectWithCount(project, 1));
});

test('Should update project in queue', () => {
  const project = {
    _id: 1,
    name: 'Project1',
  };
  const projectUpdated = {
    _id: 1,
    name: 'Project1',
  };
  updateStatuses.putProjectToQueue(project);
  updateStatuses.putProjectToQueue(projectUpdated);
  expect(updateStatuses.queue.size).toBe(1);
  expect(updateStatuses.queue.has(1)).toBeTruthy();
  expect(updateStatuses.queue.get(1)).toMatchObject(projectUpdated);
});

test('Should call updateStatus after pingAfter', () => {
  jest.useFakeTimers();
  const execute = jest.fn();
  const get = jest.fn();
  // eslint-disable-next-line no-shadow
  const updateStatuses = new UpdateStatuses({
    updateStatus: {
      execute,
    },
    getPage: {
      get,
    },
    config: { pingAfter },
  });

  const project = projects[0];
  const spy = jest.spyOn(updateStatuses, 'updateStatus');
  updateStatuses.execute();
  updateStatuses.putProjectToQueue(project);
  // expect(updateStatuses.updateStatus).not.toBeCalled();
  expect(get).not.toBeCalled();
  jest.runAllTimers();
  // jest.advanceTimersByTime(pingAfter * 2);
  expect(get).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(updateStatuses.timers.size).toBe(1);
  jest.useRealTimers();
});
